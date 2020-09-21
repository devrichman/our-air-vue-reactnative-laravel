<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAircraftsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aircrafts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('flight_category_id')->unsigned();
            $table->string('type');
            $table->year('year_of_make')->nullable();
            $table->date('interior_refurbished')->nullable();
            $table->date('exterior_refurbished')->nullable();
            $table->text('amenities');
            $table->integer('max_range_nm');
            $table->integer('cruise_speed_knots');
            $table->integer('max_pax');
            $table->timestamps();

            $table->foreign('flight_category_id')->references('id')->on('flight_categories');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('aircrafts');
    }
}
