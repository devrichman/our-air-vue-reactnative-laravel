<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

/**
 * Class LanguageLineResource
 * @package App\Http\Resources
 */
class LanguageLineResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'            => $this->when(Auth::guard('admin')->check(), $this->id),
            'group'         => $this->when(Auth::guard('admin')->check(), $this->group),
            'key'           => $this->when(Auth::guard('admin')->check(), $this->key),
            'full_key'      => $this->group.'.'.$this->key,
            'translation'   => $this->translation ?? null,
            'text'          => $this->when(Auth::guard('admin')->check(), $this->text),
        ];
    }
}
