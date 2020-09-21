<?php

namespace App\Providers;

use Illuminate\Support\Arr;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Arr::macro('randomBetween', function ($min = 1, $max = 10, $minResult = 1, $maxResult = 10) {
            $randomArray = [];
            for ($i = $min; $i <= $max; $i++) {
                $randomArray[$i] = $i;
            }

            return (array)array_rand($randomArray, rand($minResult, $maxResult));
        });
    }
}
