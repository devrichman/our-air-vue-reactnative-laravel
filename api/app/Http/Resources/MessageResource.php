<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

/**
 * Class BookingResource
 * @package App\Http\Resources
 */
class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     * @throws \Exception
     */
    public function toArray($request)
    {
        return [
            'id'               => $this->id,
            'content'          => $this->content,
            'author_id'        => $this->author_id,
            'created_at'       => $this->created_at,
            'is_admin'         => $this->is_admin,
            'author'           => [
                'id'               => $this->author_id,
                'firstname'        => $this->author->firstname,
                'lastname'         => $this->author->lastname,
            ],
        ];
    }
}
