<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class ServiceResource
 * @package App\Http\Resources
 */
class ServiceResource extends JsonResource
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
            'code'          => $this->code,
            'active'        => (bool)$this->active,
            'title'         => trans('services.'.$this->code),
            'description'   => trans('services.'.$this->code.'_description'),
            'image'         => asset('storage/static/services/'.$this->code.'.png'),
        ];
    }
}
