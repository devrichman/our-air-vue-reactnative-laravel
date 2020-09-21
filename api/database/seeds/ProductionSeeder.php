<?php

use Illuminate\Database\Seeder;

/**
 * Class ProductionSeeder
 */
class ProductionSeeder extends Seeder
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
        $this->call(LocaleSeeder::class);
        $this->call(AdminSeeder::class);
        $this->call(GenderSeeder::class);
    }
}
