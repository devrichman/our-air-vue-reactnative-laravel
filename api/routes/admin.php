<?php

use App\Http\Resources\AdminResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * Guest routes
 */
Route::group(['middleware' => []], function () {
    /**
     * Login a public user
     * @package User
     */
    Route::post('/users/login', 'Admin\Auth\LoginController@login');
});

/**
 * Private routes
 */
Route::group(['middleware' => ['auth:admin']], function () {
    /**
     * Get connected user
     * @package User
     */
    Route::middleware('throttle:600,1')->group(function () {
        Route::get('/me', function (Request $request) {
            return new AdminResource($request->user());
        });
    });

    /**
     * Get connected user
     * @package User
     */
    Route::post('/me/logout', 'Admin\Auth\LoginController@logout');

    /**
     * Create or update settings
     * @package Settings
     */
    Route::post('/settings', 'SettingsController@save');

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
     * Get all available transalations
     * @package Locale
     */
    Route::get('/locales/lines', 'LocaleController@getLines');

    /**
     * Save all lines
     * @package Locale
     */
    Route::post('/locales/lines', 'LocaleController@saveLines');

    /**
     * Get available transalations for a given locale
     * @package Locale
     */
    Route::get('/locales/{locale}/lines', 'LocaleController@getLinesByLocale');

    /**
     * Get available transalations for a given locale
     * @package Locale
     */
    Route::post('/locales/{locale}/lines', 'LocaleController@saveLines');

    /**
     * Get available genders
     * @package Gender
     */
    Route::get('/genders', 'GenderController@getAll');

    /**
     * Get all services
     * @package Service
     */
    Route::get('/services', 'ServiceController@getAll');

    /**
     * Get all options
     * @package Option
     */
    Route::get('/options', 'OptionController@getAll');

    /**
     * Get availables options on top of the services provided
     * @package Option
     */
    Route::get('/services/{service}/options', 'OptionController@getOptionsFromService');

    /**
     * Get availables services on top of the options provided
     * @package Service
     */
    Route::get('/options/{option}/services', 'ServiceController@getServicesFromOption');

    /**
     * Get a specific option
     * @package Option
     */
    Route::get('/options/{option}', 'OptionController@show');

    /**
     * Save a new option
     * @package Option
     */
    Route::post('/options', 'OptionController@store');

    /**
     * Modify a specific option
     * @package Option
     */
    Route::post('/options/{option}', 'OptionController@update');

    /**
     * Delete a specific option
     * @package Option
     */
    Route::delete('/options/{option}', 'OptionController@destroy');

    /**
     * Create a Flight Category
     * @package Flight
     */
    Route::post('/flights/categories', 'Flight\CategoryController@save');

    /**
     * Update a Flight Category
     * @package Flight
     */
    Route::post('/flights/categories/{category}', 'Flight\CategoryController@save');

    /**
     * Update a Flight Category
     * @package Flight
     */
    Route::delete('/flights/categories/{category}', 'Flight\CategoryController@delete');

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
     * Create a Aircraft
     * @package Aircraft
     */
    Route::post('/aircrafts', 'AircraftController@save');

    /**
     * Update a Aircraft
     * @package Aircraft
     */
    Route::post('/aircrafts/{aircraft}', 'AircraftController@save');

    /**
     * Delete a Aircraft
     * @package Aircraft
     */
    Route::delete('/aircrafts/{aircraft}', 'AircraftController@delete');

    /**
     * list all Aircraft
     * @package Aircraft
     */
    Route::get('/aircrafts', 'AircraftController@getAll');

    /**
     * Get one Aircraft
     * @package Aircraft
     */
    Route::get('/aircrafts/{aircraft}', 'AircraftController@get');




    /*
     * Get all bookings
     * @package Booking
     */
    Route::get('/bookings', 'BookingController@index');

    /*
     * Get a given booking
     * @package Booking
     */
    Route::get('/bookings/{booking}', 'BookingController@get');

    /**
     * Delete a specific booking
     * @package Booking
     */
    Route::delete('/bookings/{booking}', 'BookingController@destroy');

    /*
     * Add an empty quote to a booking
     * @package Quote
     */
    Route::post('/bookings/{booking}/quotes', 'Booking\QuoteController@add');

    /*
     * Update a given quote from a booking
     * @package Quote
     */
    Route::post('/bookings/{booking}/quotes/{quote}', 'Booking\QuoteController@update');

    /**
     * get chat history on the booking
     */
    Route::get('/bookings/{booking}/messages', 'ConversationController@getMessages');

    /**
     * create a message on the booking
     */
    Route::post('/bookings/{booking}/messages', 'ConversationController@newMessage');

    /*
     * Add a segment to a quote
     * @package Quote
     */
    Route::post('/quotes/{quote}/segments', 'Booking\QuoteController@addSegment');

    /*
     * Update a given segment to a quote
     * @package Quote
     */
    Route::post('/quotes/{quote}/segments/{segment}', 'Booking\QuoteController@updateSegment');

    /*
     * Remove a given segment to a quote
     * @package Quote
     */
    Route::delete('/quotes/{quote}/segments/{segment}', 'Booking\QuoteController@removeSegment');

    /*
     * Add an aircraft to a quote
     * @package Quote
     */
    Route::post('/quotes/{quote}/aircrafts/{aircraft}', 'Booking\QuoteController@addAircraft');

    /*
     * Remove a given aircraft to a quote
     * @package Quote
     */
    Route::delete('/quotes/{quote}/aircrafts/{aircraft}', 'Booking\QuoteController@removeAircraft');

    /*
     * Add an option to a quote
     * @package Quote
     */
    Route::post('/quotes/{quote}/options', 'Booking\QuoteController@addOption');

    /*
     * Update a given option to a quote
     * @package Quote
     */
    Route::post('/quotes/{quote}/options/{option}', 'Booking\QuoteController@updateOption');

    /*
     * Remove a given option to a quote
     * @package Quote
     */
    Route::delete('/quotes/{quote}/options/{option}', 'Booking\QuoteController@removeOption');

    /*
     * Remove a quote from booking
     * @package Quote
     */
    Route::delete('/quotes/{quote}', 'Booking\QuoteController@remove');

    /*
     * Get quote statuses
     * @package Quote
     */
    Route::get('/quotes/statuses', 'Booking\QuoteController@getStatuses');

    /**
     * Get all users
     * @package User
     */
    Route::get('/users', 'UserController@index');
    /**
     * Get a specific user
     * @package User
     */
    Route::get('/users/{user}', 'UserController@show');
    /**
     * Delete a specific user
     * @package User
     */
    Route::delete('/users/{user}', 'UserController@destroy');
    /**
     * Save a new user
     * @package User
     */
    Route::post('/users', 'UserController@store');
    /**
     * Modify a specific user
     * @package User
     */
    Route::post('/users/{user}', 'UserController@update');


    /**
     * Get all contractors
     * @package Contractor
     */
    Route::get('/contractors', 'ContractorController@index');
    /**
     * Get a specific contractor
     * @package Contractor
     */
    Route::get('/contractors/{contractor}', 'ContractorController@show');
    /**
     * Delete a specific contractor
     * @package Contractor
     */
    Route::delete('/contractors/{contractor}', 'ContractorController@destroy');
    /**
     * Save a new contractor
     * @package Contractor
     */
    Route::post('/contractors', 'ContractorController@store');
    /**
     * Modify a specific contractor
     * @package Contractor
     */
    Route::post('/contractors/{contractor}', 'ContractorController@update');



    /**
     * Get all airports availables
     * @package Airport
     */
    Route::get('/airports', 'AirportController@getAll');
});
