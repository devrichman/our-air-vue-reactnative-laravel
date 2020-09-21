<?php

namespace App\Http\Controllers\Flight;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveFlightCategoryRequest;
use App\Models\Asset;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Flight\Category as FlightCategory;
use App\Models\Airport;
use App\Http\Resources\FlightCategoryResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Throwable;
use Storage;

/**
 * Class CategoryController
 * @package App\Http\Controllers\Flight
 */
class CategoryController extends Controller
{
    /**
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function getAll(Request $request)
    {
        $filter=$request->get('filters');
        $categories=FlightCategory::where('name', 'like', '%'.$filter.'%')
            ->orderBy($request->get('orderProp', 'id'), $request->get('order', 'asc'))
            ->paginate($request->get('perPage'));

        $from[] = $request->get('from') ?? 0;
        $to[] = $request->get('to') ?? 0;
        $from[] = $request->get('from_back') ?? 0;
        $to[] = $request->get('to_back') ?? 0;

        $dist = 0;
        for ($i = 0; $i<2; $i++) {
            if ($from[$i]>0 && $to[$i]>0) {
                $airport_from = Airport::find($from[$i]);
                $airport_to = Airport::find($to[$i]);
                $dist += $this->calcDistance(
                    $airport_from->latitude_deg,
                    $airport_from->longitude_deg,
                    $airport_to->latitude_deg,
                    $airport_to->longitude_deg,
                    'K'
                );
            }
        }


        foreach ($categories->items() as $category) {
            $category->distance = round($dist);
            if ($category->average_speed > 0) {
                $category->duration = round($dist / (int)$category->average_speed);
                $category->segment_price = round($category->average_price * $category->duration);
            } else {
                $category->duration = 0;
                $category->segment_price = 0;
            }
        }
        return FlightCategoryResource::collection($categories);
    }

    /**
     * @param FlightCategory $category
     * @return FlightCategoryResource
     */
    public function get(FlightCategory $category)
    {
        return new FlightCategoryResource($category);
    }

    /**
     * @param FlightCategory|null $category
     * @param SaveFlightCategoryRequest $request
     * @return mixed
     * @throws Throwable
     */
    public function save(SaveFlightCategoryRequest $request, FlightCategory $category = null)
    {
        return DB::transaction(function () use ($request, $category) {
            // Save category
            $category = $category ?? new FlightCategory();
            $category->fill($request->all());

            // Remove the deleted assets on edit page
            if ($category->exists) {
                foreach ($request->get('old_assets') as $oldAsset) {
                    if ((int)$oldAsset !== 0) {
                        $category->assets()->detach((int)$oldAsset);
                        $this->removeAssetFile((int)$oldAsset);
                    }
                }
            }

            $category->save();

            // Save new assets
            if ($request->file('assets')) {
                foreach ($request->file('assets') as $asset) {
                    $path = $asset->store(Asset::FLIGHT_CATEGORIES_FOLDER);
                    $filename = $asset->getClientOriginalName();
                    $category->assets()->save(new Asset([
                        'path'      => $path,
                        'filename'  => $filename,
                    ]));
                }
            }


            return new FlightCategoryResource($category);
        });
    }

    /**
     * @param FlightCategory $category
     * @return JsonResponse
     * @throws Exception
     */
    public function delete(FlightCategory $category)
    {
        $bookings = $category->bookings();
        $aircrafts = $category->aircrafts();

        if ($bookings->count() !== 0) {
            throw new UnprocessableEntityHttpException(
                'Cette catégorie ne peut pas être supprimée car elle est liée à des réservations.'
            );
        }

        if ($aircrafts->count() !== 0) {
            throw new UnprocessableEntityHttpException(
                'Cette catégorie ne peut pas être supprimée car elle est liée à des appareils.'
            );
        }

        $assets = $category->assets()->get();
        $category->assets()->detach();
        $category->delete();
        foreach ($assets as $asset) {
            $this->removeAssetFile($asset->id);
        }
        return response()->json([], 204);
    }

    /**
     * @param int $item
     */
    public function removeAssetFile($item)
    {
        $asset = Asset::findOrFail($item);
        if (Storage::disk()->exists($asset['path'])) {
            Storage::disk()->delete($asset['path']);
        }
        $asset->delete();
    }

    public function calcDistance($lat1, $lon1, $lat2, $lon2, $unit)
    {
        if (($lat1 == $lat2) && ($lon1 == $lon2)) {
            return 0;
        } else {
            $theta = $lon1 - $lon2;
            $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +
                    cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
            $dist = acos($dist);
            $dist = rad2deg($dist);
            $miles = $dist * 60 * 1.1515;
            $unit = strtoupper($unit);

            if ($unit == 'K') {
                return ($miles * 1.609344);
            } elseif ($unit == 'N') {
                return ($miles * 0.8684);
            } else {
                return $miles;
            }
        }
    }
}
