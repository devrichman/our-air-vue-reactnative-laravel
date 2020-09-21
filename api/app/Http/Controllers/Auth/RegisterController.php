<?php

namespace App\Http\Controllers\Auth;

use App\Models\Locale;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

/**
 * Class RegisterController
 * @package App\Http\Controllers\Auth
 */
class RegisterController extends Controller
{
    use RegistersUsers;

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'email'     => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password'  => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'email'     => $data['email'],
            'password'  => Hash::make($data['password']),
            'status'    => 'not_completed'
        ]);
    }
    protected function update(Request $request)
    {
        $data = $request->all();
        $locale_id = Locale::where('iso', $request->locale_iso)->value('id');
        $data['locale_id'] = $locale_id ?? null;

        Validator::make($data, [
            'lastname'  => 'required|string|max:255',
            'firstname' => 'required|string|max:255',
            'phone'     => 'required|string',
            'gender_id' => 'required|integer'
        ])->validate();
        $user = $request->user();
        $user->update([
            'lastname'  => $data['lastname'],
            'firstname' => $data['firstname'],
            'phone'     => $data['phone'],
            'gender_id' => $data['gender_id'],
            'locale_id' => $data['locale_id'],
            'status'    => 'completed'
        ]);
        return new UserResource($user);
    }

    /**
     * The user has been registered.
     *
     * @param Request $request
     * @param mixed $user
     * @return UserResource
     */
    protected function registered(Request $request, $user)
    {
        return new UserResource($user);
    }
}
