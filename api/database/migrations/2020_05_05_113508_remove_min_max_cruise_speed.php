<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveMinMaxCruiseSpeed extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('flight_categories', function (Blueprint $table) {
            $table->dropColumn('min_cruise_speed_knots');
            $table->dropColumn('max_cruise_speed_knots');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('flight_categories', function (Blueprint $table) {
            $table->integer('min_cruise_speed_knots');
            $table->integer('max_cruise_speed_knots');
        });
    }
}
