<?php

/* @var Factory $factory */

use App\Models\Flight\Category;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

$factory->define(Category::class, function (Faker $faker) {
    return [
        'name'                      => $faker->company,
        'min_pax'                   => $faker->numberBetween(5, 10),
        'max_pax'                   => $faker->numberBetween(10, 50),
        'average_price'             => $faker->numberBetween(100, 1000),
        'average_speed'             => $faker->numberBetween(500, 10000),
        'description'               => $faker->sentence,
    ];
});
