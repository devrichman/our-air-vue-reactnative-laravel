<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class SaveLocaleLinesRequest
 * @package App\Http\Requests
 */
class SaveLocaleLinesRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'lines' => 'required|array'
        ];
    }
}
