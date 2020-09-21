<?php

namespace App\Http\Controllers;

use App\Http\Resources\GenderResource;
use App\Models\Gender;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class GenderController extends Controller
{
    /**
     * @return AnonymousResourceCollection
     */
    public function getAll()
    {
        return GenderResource::collection(Gender::all());
    }
}
