<?php

namespace App\Http\Resources;

use App\Enum\QuoteStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

/**
 * Class BookingResource
 * @package App\Http\Resources
 */
class BookingResource extends JsonResource
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
            'id'            => $this->id,
            'created_at'    => $this->created_at,
            'last_message'       => MessageResource::make($this->messages->last()),
            'status'        => [
                'code'          => $this->status,
                'label'         => __('booking.status_'.$this->status),
            ],
            'client'        => UserResource::make($this->client),
            'service'       => ServiceResource::make($this->service),
            'request'       => [
                'categories'    => FlightCategoryResource::collection($this->flightCategories),
                'segments'      => SegmentResource::collection($this->segments),
                'options'       => OptionResource::collection($this->options),
            ],
            'quotes'        => QuoteResource::collection(Auth::guard('admin')->check() ?
                $this->quotes : $this->quotes()->where('status', '!=', QuoteStatus::draft())->get())
        ];
    }
}
