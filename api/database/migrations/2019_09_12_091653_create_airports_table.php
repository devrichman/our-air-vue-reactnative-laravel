<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAirportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('airports', function (Blueprint $table) {
            $table->charset = 'utf8';
            $table->collation = 'utf8_unicode_ci';
            $table->bigIncrements('id');
            $table->string('ident', 10);
            $table->string('type', 30)->nullable();
            $table->string('name', 200)->nullable();
            $table->string('latitude_deg', 50)->nullable();
            $table->string('longitude_deg', 50)->nullable();
            $table->string('elevation_ft', 10)->nullable();
            $table->string('continent', 10)->nullable();
            $table->string('iso_country', 10)->nullable();
            $table->string('iso_region', 10)->nullable();
            $table->string('municipality', 100)->nullable();
            $table->string('scheduled_service', 10)->nullable();
            $table->string('gps_code', 20)->nullable();
            $table->string('iata_code', 20)->nullable();
            $table->string('local_code', 20)->nullable();
            $table->string('home_link', 300)->nullable();
            $table->string('wikipedia_link', 300)->nullable();
            $table->string('keywords', 300)->nullable();
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
        Schema::dropIfExists('airports');
    }
}
