<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class SaveFlightCategoryRequest
 * @package App\Http\Requests
 */
class SaveFlightCategoryRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $category = $this->route('category');

        $rule_data = [
            'name'                      => ['required'],
            'description'               => ['required'],
            'min_pax'                   => ['required', 'numeric'],
            'max_pax'                   => ['required', 'numeric'],
            'average_price'             => ['required', 'numeric'],
            'average_speed'             => ['required', 'numeric'],
        ];

        if (!$category) {
            $rule_data['assets'] = ['required'];
            $rule_data['assets.*'] = ['image'];
        }

        return $rule_data;
    }
}
