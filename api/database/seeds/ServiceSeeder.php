<?php

use App\Models\Service;
use Illuminate\Database\Seeder;

/**
 * Class ServiceSeeder
 */
class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Service::firstOrCreate([
            'code'   => 'flight',
            'order'  => 1,
            'active' => 1,
        ]);
        Service::firstOrCreate([
            'code'   => 'helicopter',
            'order'  => 2,
            'active' => 0,
        ]);
        Service::firstOrCreate([
            'code'   => 'car',
            'order'  => 3,
            'active' => 0,
        ]);
        Service::firstOrCreate([
            'code'   => 'yacht',
            'order'  => 4,
            'active' => 0,
        ]);
    }
}
