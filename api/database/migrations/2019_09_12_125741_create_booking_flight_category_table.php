<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateBookingFlightCategoryTable
 */
class CreateBookingFlightCategoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('booking_flight_category', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('booking_id')->unsigned();
            $table->integer('flight_category_id')->unsigned();
            $table->timestamps();

            $table->foreign('booking_id')->references('id')->on('bookings')->onDelete('cascade');
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
        Schema::dropIfExists('booking_flight_category');
    }
}
