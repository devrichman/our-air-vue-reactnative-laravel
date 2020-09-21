<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaveSettingsRequest;
use App\Http\Resources\SettingsResource;
use App\Models\Settings;

/**
 * Class SettingsController
 * @package App\Http\Controllers
 */
class SettingsController extends Controller
{
    /**
     * @return SettingsResource
     */
    public function get()
    {
        return new SettingsResource(Settings::firstOrNew(['id' => 1]));
    }

    /**
     * @param SaveSettingsRequest $request
     * @return SettingsResource
     */
    public function save(SaveSettingsRequest $request)
    {
        $settings = Settings::updateOrCreate([
            'id'            => 1,
        ], [
            'email'         => $request->get('email'),
            'phone'         => $request->get('phone'),
            'general_terms' => $request->get('general_terms'),
        ]);

        return new SettingsResource($settings);
    }
}
