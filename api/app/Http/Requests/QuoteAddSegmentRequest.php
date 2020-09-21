<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QuoteAddSegmentRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'from'      => 'required|exists:airports,id',
            'to'        => 'required|exists:airports,id',
            'date'      => 'required|date',
        ];
    }
}
