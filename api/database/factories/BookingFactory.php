<?php

/* @var Factory $factory */

use App\Enum\BookingStatus;
use App\Models\Booking;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;
use Illuminate\Support\Arr;

$factory->define(Booking::class, function (Faker $faker) {
    return [
        'user_id'       => rand(1,5),
        'service_id'    => rand(1,4),
        'status'        => Arr::random(BookingStatus::getValues()),
    ];
});
