<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateFlightCategoriesImageUrl
 */
class CreateFlightCategoryAssetTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flight_category_asset', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('flight_category_id')->unsigned();
            $table->bigInteger('asset_id')->unsigned();
            $table->timestamps();

            $table->foreign('flight_category_id')->references('id')->on('flight_categories');
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
        Schema::dropIfExists('flight_category_asset');
    }
}
