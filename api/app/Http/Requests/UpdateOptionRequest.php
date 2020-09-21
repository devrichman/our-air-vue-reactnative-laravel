<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOptionRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        if (isset($this->type)) {
            return [];
        }
        return [
            'label' => 'required',
            'description' => 'required',
            'services' => 'required|array|exists:services,id',
            'icon' => 'required',
        ];
    }
}
