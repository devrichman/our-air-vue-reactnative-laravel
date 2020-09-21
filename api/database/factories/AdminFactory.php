<?php

/** @var Factory $factory */

use App\Models\Admin;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;

$factory->define(Admin::class, function (Faker $faker, $data) {
    return [
        'name' => $faker->name,
        'email' => Arr::get($data, 'email', $faker->unique()->safeEmail),
        'password' => Hash::make('secret'),
    ];
});
