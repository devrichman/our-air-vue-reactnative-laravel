<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaveAircraftRequest;
use App\Models\Asset;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Aircraft;
use App\Http\Resources\AircraftResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Throwable;
use Storage;

/**
 * Class AircraftController
 * @package App\Http\Controllers
 */
class AircraftController extends Controller
{
    /**
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function getAll(Request $request)
    {
        $filter=$request->get('filters');
        $aircraft=Aircraft::where('type', 'like', '%'.$filter.'%')
            ->orderBy($request->get('orderProp', 'id'), $request->get('order', 'asc'))
            ->paginate($request->get('perPage'));
        return AircraftResource::collection($aircraft);
    }

    /**
     * @param Aircraft $aircraft
     * @return AircraftResource
     */
    public function get(Aircraft $aircraft)
    {
        return new AircraftResource($aircraft);
    }

    /**
     * @param Aircraft|null $aircraft
     * @param SaveAircraftRequest $request
     * @return mixed
     * @throws Throwable
     */
    public function save(SaveAircraftRequest $request, Aircraft $aircraft = null)
    {
        return DB::transaction(function () use ($request, $aircraft) {
            // Save aircraft
            $aircraft = $aircraft ?? new Aircraft();
            $aircraft->fill($request->all());

            // Remove the deleted assets on edit page
            if ($aircraft->exists && $request->get('old_assets')[0]) {
                foreach ($request->get('old_assets') as $oldAsset) {
                    $aircraft->assets()->detach((int)$oldAsset);
                    $this->removeAssetFile((int)$oldAsset);
                }
            }

            $aircraft->save();

            // Save new assets
            if ($request->file('assets')) {
                foreach ($request->file('assets') as $asset) {
                    $path = $asset->store(Asset::AIRCRAFTS_FOLDER);
                    $filename = $asset->getClientOriginalName();
                    $aircraft->assets()->save(new Asset([
                        'path'      => $path,
                        'filename'  => $filename,
                    ]), ['category'=>$request->get('asset_category')]);
                }
            }
            
            return new AircraftResource($aircraft);
        });
    }

    /**
     * @param Aircraft $aircraft
     * @return JsonResponse
     * @throws Exception
     */
    public function delete(Aircraft $aircraft)
    {
        $assets = $aircraft->assets()->get();
        $aircraft->assets()->detach();
        $aircraft->delete();
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
}
