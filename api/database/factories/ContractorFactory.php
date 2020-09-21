<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Contractor;
use Faker\Generator as Faker;

$factory->define(Contractor::class, function (Faker $faker) {
    return [
        'name'           => $faker->name,
        'description'    => $faker->sentence,
    ];
});
