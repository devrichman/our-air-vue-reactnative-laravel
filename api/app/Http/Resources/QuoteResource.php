<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuoteResource extends JsonResource
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
            'booking_id'    => $this->booking_id,
            'amount'        => $this->amount,
            'currency'      => $this->currency,
            'status'        => $this->status,
            'segments'      => SegmentResource::collection($this->segments),
            'options'       => QuoteOptionResource::collection($this->options),
            'aircrafts'     => AircraftResource::collection($this->aircrafts),
            'assets'        => count($this->assets) ? new AssetResource($this->assets[0]) : null,
            //'assets'        => count($this->assets()->get()) ? new AssetResource($this->assets()->get()[0]) : null,
        ];
    }
}
