<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Asset;
use Faker\Generator as Faker;

$factory->define(Asset::class, function (Faker $faker) {
    return [
        'path'      => $faker->imageUrl(640, 640, 'transport'),
        'disk'      => Asset::EXTERNAL_DISK,
        'filename'  => $faker->image(null, 640, 640, 'transport'),
    ];
});
