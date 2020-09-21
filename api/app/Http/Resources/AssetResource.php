<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Class AssetResource
 * @package App\Http\Resources
 */
class AssetResource extends JsonResource
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
            'full_path'     => $this->fullPath,
            'file_name'     => $this->filename,
            'path'          => $this->path,
        ];
    }
}
