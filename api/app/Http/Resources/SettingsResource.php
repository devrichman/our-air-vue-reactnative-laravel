<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class SettingsResource
 * @package App\Http\Resources
 */
class SettingsResource extends JsonResource
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
            'email'             => $this->email,
            'phone'             => $this->phone,
            'general_terms'     => $this->general_terms,
        ];
    }
}
