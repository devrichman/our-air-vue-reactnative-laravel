<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetUsersRequest;
use App\Http\Requests\SaveUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Locale;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

/**
 * Class BookingController
 * @package App\Http\Controllers
 */
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param GetUsersRequest $request
     * @return AnonymousResourceCollection
     */
    public function index(GetUsersRequest $request)
    {
        $filter=$request->get('filters');

        $users = User::when($request->user() instanceof User, function ($query) {
                $query->where('user_id', Auth::id());
        })->where('firstname', 'like', '%'.$filter.'%')
          ->orwhere('lastname', 'like', '%'.$filter.'%')
          ->orwhere('email', 'like', '%'.$filter.'%')
          ->orderBy($request->get('orderProp', 'id'), $request->get('order', 'asc'))
          ->paginate($request->get('perPage'));

        return UserResource::collection($users);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
    }

    /**
     * Create a user for admins
     * @param SaveUserRequest $request
     * @return UserResource
     */
    public function store(SaveUserRequest $request)
    {
        $user = User::create([
            'email' => $request->get('email'),
            'firstname' => $request->get('firstname'),
            'lastname' => $request->get('lastname'),
            'phone' => $request->get('phone'),
            'locale_id' => $request->get('locale_id'),
            'gender_id' => $request->get('gender_id'),
            'password' => Hash::make($request->get('password')),
            'comments' => $request->get('comments'),
        ]);
        return new UserResource($user);
    }

    /**
     * Update a user for admins or self
     * @param User $user
     * @param UpdateUserRequest $request
     * @return UserResource
     */
    public function update(User $user, UpdateUserRequest $request)
    {
        $locale_id = Locale::where('iso', $request->locale_iso)->value('id');

        $user->update([
            'email' => $request->get('email'),
            'firstname' => $request->get('firstname'),
            'lastname' => $request->get('lastname'),
            'phone' => $request->get('phone'),
            'locale_id' => $locale_id ?? $request->get('locale_id'),
            'gender_id' => $request->get('gender_id'),
        ]);

        if ($request->get('updatepassword')) {
            $user->update(['password' => Hash::make($request->get('password'))]);
        }

        if ($request->get('comments') && Auth::guard('admin')->check()) {
            $user->update(['comments' => $request->get('comments')]);
        }

        return new UserResource($user);
    }
}
