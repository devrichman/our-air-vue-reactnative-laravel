<?php

/* @var Factory $factory */

use App\Models\Option;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

$factory->define(Option::class, function (Faker $faker) {
    return [
        'label'         => $faker->word,
        'description'   => $faker->sentence(),
        'icon'          => $faker->word,
        'active'        => 1,
    ];
});
