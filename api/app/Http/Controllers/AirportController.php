<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Airport;
use App\Models\Booking;
use App\Http\Resources\AirportResource;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Auth;
use Throwable;

/**
 * Class CategoryController
 * @package App\Http\Controllers\Flight
 */
class AirportController extends Controller
{
    public function getAll(Request $request)
    {
        $search = $request->get('search') ?? null;
        if ($search) {
            $airports = Airport::where(function ($query) use ($search) {
                $query
                    ->orWhere('name', 'like', '%'.$search.'%')
                    ->orwhere('iso_country', 'like', '%'.$search.'%')
                    ->orwhere('iso_region', 'like', '%'.$search.'%')
                    ->orwhere('iata_code', 'like', '%'.$search.'%');
            })
                // @todo remove hard-coded for airport only
                ->whereIn('type', ['small_airport', 'medium_airport', 'large_airport'])
                ->where('type', '!=', 'closed')
                ->take(50)
                ->get();
        } else {
            if (!Auth::check()) {
                $airports = [];
                return response()->json([]);
            } else {
                $user = Auth::user();
                $airports = $user->getFavoriteAirports();
            }
        }
        return AirportResource::collection($airports);
    }
}
