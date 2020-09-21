<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $user = $this->route('user');
        $password = $user ? null : 'required|min:6|same:password_confirmation';

        $uniqueRule = Rule::unique('users', 'email')->where(function ($query) {
            return $query->where('deleted_at', null);
        });
        $rule_data = [
            'firstname' => 'required',
            'lastname'  => 'required',
            'email'     => [
                'required',
                'email',
                $user ? $uniqueRule->ignore($user) : $uniqueRule
            ],
            'phone'     => 'required',
            'locale_id' => 'required',
            'gender_id' => 'required',
            'comments'  => 'string',
        ];
        if ($password) {
            $rule_data['password'] = $password;
        }
        return $rule_data;
    }
}
