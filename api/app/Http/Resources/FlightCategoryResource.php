<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class FlightCategoryResource
 * @package App\Http\Resources
 */
class FlightCategoryResource extends JsonResource
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
            'id'                        => $this->id,
            'description'               => $this->description,
            'name'                      => $this->name,
            'min_pax'                   => $this->min_pax,
            'max_pax'                   => $this->max_pax,
            'min_cruise_speed_knots'    => $this->min_cruise_speed_knots,
            'max_cruise_speed_knots'    => $this->max_cruise_speed_knots,
            'average_price'             => $this->average_price ?? 0,
            'average_speed'             => $this->average_speed,
            'distance'                  => $this->distance ?? 0,
            'duration'                  => $this->duration ?? 0,
            'segment_price'             => $this->segment_price ?? 0,
            'assets'                    => AssetResource::collection($this->assets),
        ];
    }
}
