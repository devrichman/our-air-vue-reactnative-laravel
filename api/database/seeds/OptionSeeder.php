<?php

use App\Models\Option;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

/**
 * Class OptionSeeder
 */
class OptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Option::class, 20)->create()->each(function ($option) {
            $option->services()->attach(Arr::randomBetween(1, 4, 1, 4));
        });
    }
}
