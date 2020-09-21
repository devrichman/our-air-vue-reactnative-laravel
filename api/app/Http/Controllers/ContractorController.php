<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetContractorsRequest;
use App\Http\Requests\SaveContractorRequest;
use App\Http\Resources\ContractorResource;
use App\Models\Contractor;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

/**
 * Class BookingController
 * @package App\Http\Controllers
 */
class ContractorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param GetContractorsRequest $request
     * @return AnonymousResourceCollection
     */
    public function index(GetContractorsRequest $request)
    {
        $filter=$request->get('filters');
         
        $contractors = Contractor::where('name', 'like', '%'.$filter.'%')
          ->orwhere('description', 'like', '%'.$filter.'%')
          ->orderBy($request->get('orderProp', 'id'), $request->get('order', 'asc'))
          ->paginate($request->get('perPage'));

        return ContractorResource::collection($contractors);
    }
    public function show(Contractor $contractor)
    {
        return new ContractorResource($contractor);
    }
    public function destroy(Contractor $contractor)
    {
        $contractor->delete();
    }
    public function store(SaveContractorRequest $request)
    {
        $contractor = Contractor::create([
            'name'        => $request->get('name'),
            'description' => $request->get('description'),
        ]);
        return new ContractorResource($contractor);
    }
    public function update(Contractor $contractor, SaveContractorRequest $request)
    {
        $contractor->update([
            'name'        => $request->get('name'),
            'description' => $request->get('description'),
        ]);
        return new ContractorResource($contractor);
    }
}
