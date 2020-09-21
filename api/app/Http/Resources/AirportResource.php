<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class UserResource
 * @package App\Http\Resources
 */
class AirportResource extends JsonResource
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
            'id'          => $this->id,
            'type'        => $this->type,
            'name'        => $this->name,
            'continent'   => $this->continent,
            'iso_country' => $this->iso_country,
            'iso_region'  => $this->iso_region,
            'municipality'=> $this->municipality,
            'iata_code'   => $this->iata_code
        ];
    }
}
