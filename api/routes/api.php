<?php

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * Guest routes
 */
Route::group(['middleware' => []], function () {
    /**
     * Get all services
     * @package Service
     */
    Route::get('/services', 'ServiceController@getAll');

    /**
     * Register a public user
     * @package User
     */
    Route::post('/users', 'Auth\RegisterController@register');
    Route::put('/me', 'Auth\RegisterController@update');
    /**
     * Login a public user
     * @package User
     */
    Route::post('/users/login', 'Auth\LoginController@login');

    Route::post('/users/password', 'Auth\ForgotPasswordController@sendResetLinkEmail');
    Route::post('/users/password/reset', 'Auth\ResetPasswordController@reset');

    /**
     * Get application parameters
     * @package Settings
     */
    Route::get('/settings', 'SettingsController@get');

    /**
     * Get available languages
     * @package Locale
     */
    Route::get('/locales', 'LocaleController@getAll');

    /**
     * Get available transalations for a given locale
     * @package Locale
     */
    Route::get('/locales/{locale}/lines', 'LocaleController@getLinesByLocale');

    /**
     * Get available genders
     * @package Gender
     */
    Route::get('/genders', 'GenderController@getAll');

    /**
     * Get all options availables
     * @package Option
     */
    Route::get('/options', 'OptionController@getAll');

    /**
     * Get all options available to a specific service
     * @package Option
     */
    Route::get('/services/{service}/options', 'OptionController@getOptionsFromService');

     /**
     * list all flight categories
     * @package Flight
     */
    Route::get('/flights/categories', 'Flight\CategoryController@getAll');

    /**
     * Get one flight category
     * @package Flight
     */
    Route::get('/flights/categories/{category}', 'Flight\CategoryController@get');

    /**
     * Get all airports availables
     * @package Airport
     */
    Route::get('/airports', 'AirportController@getAll');

    /**
     * Webhook for YouSign callback
     */
    Route::post('/webhook/you-sign-webhook', 'YouSignWebhookController@handle');

    /**
     * Redirect after successfully signing
     */
    Route::get('/signing/success', function (Request $request) {
        return '';
    });
});

/**
 * Private routes
 */
Route::group(['middleware' => ['auth:api']], function () {
    /**
     * Get connected user
     * @package User
     */
    Route::middleware('throttle:200,1')->group(function () {
        Route::get('/me', function (Request $request) {
            return new UserResource($request->user());
        });
    });

    /**
     * Get connected user
     * @package User
     */
    Route::post('/me/logout', 'Auth\LoginController@logout');

    /**
     * @todo remove `me` from route
     * Get all bookings associated with the connected client
     * @package Option
     */
    Route::get('/me/bookings', 'BookingController@index');

    /**
     * @todo remove `me` from route
     * Create a booking associated to client
     * @package Option
     */
    Route::post('/me/bookings', 'BookingController@save');

    /**
     * Modify personal informations
     * @package User
     */
    Route::post('/me/users/{user}', 'UserController@update');

    /**
     * Create a booking associated to client
     * @package Option
     */
    Route::get('/bookings/{booking}', 'BookingController@get');

    /**
     * get chat history on the booking
     */
    Route::get('/bookings/{booking}/messages', 'ConversationController@getMessages');

    /**
     * create a message on the booking
     */
    Route::post('/bookings/{booking}/messages', 'ConversationController@newMessage');

    /**
     * Accept and sign a document
     * @package Option
     */
    Route::post('/quotes/{quote}', 'Booking\QuoteController@accept');

    /**
     * Accept and sign a document
     * @package Option
     */
    Route::post('/quotes/{quote}/payment', 'Booking\QuoteController@payment');
});
