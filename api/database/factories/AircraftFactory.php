<?php

/** @var \Illuminate\Database\Eloquent\Aircraft $factory */

use App\Models\Aircraft;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

$factory->define(Aircraft::class, function (Faker $faker) {
    return [
        'flight_category_id'    => rand(1, 20),
        'type'                  => $faker->word,
        'year_of_make'          => $faker->year(),
        'interior_refurbished'  => $faker->dateTime(),
        'exterior_refurbished'  => $faker->dateTime(),
        'amenities'             => $faker->sentence,
        'max_range_nm'          => $faker->numberBetween(500, 10000),
        'cruise_speed_knots'    => $faker->numberBetween(500, 2000),
        'max_pax'               => $faker->numberBetween(5, 50),
    ];
});
