<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServiceResource;
use App\Models\Option;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ServiceController extends Controller
{
    /**
     * @return AnonymousResourceCollection
     */
    public function getAll()
    {
        return ServiceResource::collection(Service::orderBy('order')->get());
    }

    /**
     * @return AnonymousResourceCollection
     */
    public function getServicesFromOption(Option $option, Request $request)
    {
        return ServiceResource::collection($option->services()->getResults());
    }
}
