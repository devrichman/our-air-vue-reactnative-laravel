<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Class SaveAircraftRequest
 * @package App\Http\Requests
 */
class SaveAircraftRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $aircraft = $this->route('aircraft');

        $rule_data = [
            'flight_category_id'    => ['required', 'numeric'],
            'type'                  => ['required'],
            'amenities'             => ['required'],
            'max_pax'               => ['required', 'numeric'],
            'max_range_nm'          => ['required', 'numeric'],
            'cruise_speed_knots'    => ['required', 'numeric'],
        ];

        if (!$aircraft) {
            $rule_data['assets'] = ['required'];
            $rule_data['assets.*'] = ['image'];
        }

        return $rule_data;
    }
}
