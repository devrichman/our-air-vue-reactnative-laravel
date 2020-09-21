<?php

use App\Models\Admin;
use Illuminate\Database\Seeder;

/**
 * Class AdminTableSeeder
 */
class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Admin::class, 1)->create([
            'email' => 'admin@tcm.com',
        ]);
    }
}
