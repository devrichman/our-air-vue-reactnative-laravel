<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Segment;
use Faker\Generator as Faker;

$factory->define(Segment::class, function (Faker $faker, $data) {
    return [
        'from'          => rand(1, 50000),
        'to'            => rand(1, 50000),
        'date'          => $faker->dateTimeBetween('+1 month', '+2 month'),
    ];
});
