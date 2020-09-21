<?php

use App\Models\Flight\Category;
use App\Models\Asset;
use Illuminate\Database\Seeder;

/**
 * Class FlightCategoryTableSeeder
 */
class FlightCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       factory(Category::class, 20)->create()->each(function($category) {
           $category->assets()->saveMany(factory(Asset::class, rand(1, 3))->make());
       });
    }
}
