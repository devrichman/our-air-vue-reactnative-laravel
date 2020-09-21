<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddMoreFieldsToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->tinyInteger('gender_id')->after('phone')->unsigned()->nullable();
            $table->smallInteger('locale_id')->after('gender_id')->unsigned()->nullable();

            $table->foreign('gender_id')->references('id')->on('genders');
            $table->foreign('locale_id')->references('id')->on('locales');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['locale_id', 'gender_id']);
            $table->dropColumn(['locale_id', 'gender_id']);
        });
    }
}
