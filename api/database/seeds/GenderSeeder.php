<?php

use App\Models\Gender;
use Illuminate\Database\Seeder;

class GenderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Gender::firstOrCreate([
            'gender' => 'm',
            'gender_label' => 'Homme',
        ]);
        Gender::firstOrCreate([
            'gender' => 'f',
            'gender_label' => 'Femme',
        ]);
    }
}
