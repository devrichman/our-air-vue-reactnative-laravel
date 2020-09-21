<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class UserResource
 * @package App\Http\Resources
 */
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $resource = [
            'id'            => $this->id,
            'lastname'      => $this->lastname,
            'firstname'     => $this->firstname,
            'phone'         => $this->phone,
            'gender'        => GenderResource::make($this->gender),
            'gender_id'     => $this->gender_id,
            'locale'        => LocaleResource::make($this->locale),
            'locale_id'     => $this->locale_id,
            'email'         => $this->email,
            'status'        => $this->status
        ];

        if (\Auth::guard('admin')->check()) {
            $resource['comments'] = $this->comments;
        }

        return $resource;
    }
}
