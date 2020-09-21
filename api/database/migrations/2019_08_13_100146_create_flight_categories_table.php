<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateFlightCategoriesTable
 */
class CreateFlightCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flight_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('min_pax');
            $table->integer('max_pax');
            $table->integer('min_cruise_speed_knots');
            $table->integer('max_cruise_speed_knots');
            $table->integer('average_price');
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flight_categories');
    }
}
