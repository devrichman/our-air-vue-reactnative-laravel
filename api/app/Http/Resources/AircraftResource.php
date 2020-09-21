<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class FlightCategoryResource
 * @package App\Http\Resources
 */
class AircraftResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'                    => $this->id,
            'flight_category_id'    => $this->flight_category_id,
            'category'              => $this->flightCategory,
            'type'                  => $this->type,
            'year_of_make'          => $this->year_of_make.'-01-01',
            'interior_refurbished'  => $this->interior_refurbished,
            'exterior_refurbished'  => $this->exterior_refurbished,
            'amenities'             => $this->amenities,
            'max_range_nm'          => $this->max_range_nm,
            'cruise_speed_knots'    => $this->cruise_speed_knots,
            'max_pax'               => $this->max_pax,
            'assets'                => AssetResource::collection($this->assets),
        ];
    }
}
