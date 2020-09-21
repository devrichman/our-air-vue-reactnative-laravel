<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OptionResource extends JsonResource
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
            'id'            => $this->id,
            'label'         => $this->label,
            'description'   => $this->description,
            'services'      => $this->services()->get(),
            'icon'          => $this->icon,
            'active'        => $this->active,
        ];
    }
}
