<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateOptionRequest;
use App\Http\Requests\UpdateOptionRequest;
use App\Http\Resources\OptionResource;
use App\Models\Option;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class OptionController extends Controller
{
    /**
     * @return AnonymousResourceCollection
     */
    public function getOptionsFromService(Service $service, Request $request)
    {
        return OptionResource::collection($service->options()->getResults());
    }

    /**
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function getAll(Request $request)
    {
        $options = Option::orderBy($request->get('orderProp', 'id'), $request->get('order', 'asc'))
            ->paginate($request->get('perPage'))
            ->where('active', $request->get('active', 1));

        return OptionResource::collection($options);
    }

    /**
     * @param  Option $option
     * @return OptionResource
     */
    public function show(Option $option)
    {
        return new OptionResource($option);
    }

    /**
     * @return OptionResource
     */
    public function store(CreateOptionRequest $request)
    {
        $option = Option::create([
            'label'         => $request->get('label'),
            'description'   => $request->get('description'),
            'icon'          => $request->get('icon'),
        ]);
        $option->services()->sync($request->get('services'));
        return new OptionResource($option);
    }

    /**
     * @param  Option $option
     * @return OptionResource
     */
    public function update(Option $option, UpdateOptionRequest $request)
    {
        if ($request->get('type') === 'disable') {
            $activeValue = $option->active ? 0 : 1;
            $option->update(['active' => $activeValue]);
        } else {
            $option->update([
                'label'         => $request->get('label'),
                'description'   => $request->get('description'),
                'icon'          => $request->get('icon'),
            ]);
            $option->services()->sync($request->get('services'));
        }

        return new OptionResource($option);
    }

    /**
     * @param Option $option
     * @return JsonResponse
     * @throws \Exception
     */
    public function destroy(Option $option)
    {
        $option->services()->detach();
        $option->delete();
        return response()->json([], 204);
    }
}
