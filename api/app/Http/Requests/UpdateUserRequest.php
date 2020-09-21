<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $admin = $this->user('admin') !== null ? true : false;

        $rule_data = [
            'email'             => 'required|email|unique:users,email,' . $this->id . ',id',
            'firstname'         => 'required',
            'lastname'          => 'required',
            'phone'             => 'required',
            'locale_id'         => 'required',
            'gender_id'         => 'required',
        ];

        if (!$admin) {
            $rule_data['updatepassword'] = 'required|bool';
            $rule_data['old_password'] = [
                'required_if:updatepassword,true',
                'nullable',
                function ($attribute, $value, $fail) {
                    if (!Hash::check($value, Auth::user()->password)) {
                        return $fail(__('The current password is incorrect.'));
                    }
                }
            ];
            $rule_data['password'] = 'required_if:updatepassword,true|nullable|min:8|confirmed';
        } else {
            $rule_data['comments'] = 'string';
        }

        return $rule_data;
    }
}
