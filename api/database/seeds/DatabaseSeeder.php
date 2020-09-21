<?php

use Illuminate\Database\Seeder;

/**
 * Class DatabaseSeeder
 */
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AirportSeeder::class);
        $this->call(ServiceSeeder::class);
        $this->call(OptionSeeder::class);
        $this->call(FlightCategoryTableSeeder::class);
        $this->call(LocaleSeeder::class);
        $this->call(AdminSeeder::class);
        $this->call(GenderSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(SegmentSeeder::class);
        $this->call(BookingSeeder::class);
        $this->call(ContractorSeeder::class);
        $this->call(AircraftSeeder::class);
    }
}
