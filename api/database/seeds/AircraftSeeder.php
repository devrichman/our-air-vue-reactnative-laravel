<?php
use App\Models\Aircraft;
use App\Models\Asset;
use Illuminate\Database\Seeder;

class AircraftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Aircraft::class, 20)->create()->each(function($aircraft) {
            $aircraft->assets()->saveMany(factory(Asset::class, rand(1, 3))->make());
        });
    }
}
