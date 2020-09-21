<?php

use App\Models\Booking;
use App\Models\Segment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

/**
 * Class BookingSeeder
 */
class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Booking::class, 20)->create()->each(function($booking) {
            $booking->options()->attach(Arr::randomBetween(1, 20, 1, 5));
            $booking->segments()->attach(Arr::randomBetween(1, 100, 1, 2));
            $booking->flightCategories()->attach(Arr::randomBetween(1, 20, 1, 3));
        });
    }
}
