<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAircraftAssetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aircraft_assets', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->enum('category', ['EXTERIOR', 'INTERIOR', 'FLOOPLAN'])->default('EXTERIOR');
            $table->bigInteger('aircraft_id')->unsigned();
            $table->bigInteger('asset_id')->unsigned();
            $table->timestamps();

            $table->foreign('aircraft_id')->references('id')->on('aircrafts');
            $table->foreign('asset_id')->references('id')->on('assets');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('aircraft_assets');
    }
}
