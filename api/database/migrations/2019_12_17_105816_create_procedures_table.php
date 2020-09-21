<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProceduresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('procedures', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('procedure_id');
            $table->string('name');
            $table->longText('description');
            $table->dateTime('created_date');
            $table->dateTime('updated_date')->default(null)->nullable();
            $table->dateTime('finished_date')->default(null)->nullable();
            $table->dateTime('expires_date')->default(null)->nullable();
            $table->string('status')->default(null)->nullable();
            $table->string('creator')->default(null)->nullable();
            $table->string('creator_firstname')->default(null)->nullable();
            $table->string('creator_lastname')->default(null)->nullable();
            $table->longText('workspace')->default(null)->nullable();
            $table->boolean('template')->default(null)->nullable();
            $table->boolean('ordered')->default(null)->nullable();
            $table->string('parent')->default(null)->nullable();
            $table->json('metadata')->default(null)->nullable();
            $table->json('config')->default(null)->nullable();
            $table->json('members')->default(null)->nullable();
            $table->json('subscribers')->default(null)->nullable();
            $table->boolean('related_files_enable')->default(null)->nullable();
            $table->boolean('archive')->default(null)->nullable();
            $table->json('archive_metadata')->default(null)->nullable();
            $table->json('fields')->default(null)->nullable();
            $table->json('permissions')->default(null)->nullable();
            $table->json('files')->default(null)->nullable();
            $table->longText('company')->default(null)->nullable();
            $table->timestamps();
        });

        Schema::table('quotes', function (Blueprint $table) {
            $table->bigInteger('procedure_id')->unsigned()->nullable();
            $table->foreign('procedure_id')->references('id')->on('procedures')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('quotes', function (Blueprint $table) {
            $table->dropColumn(['procedure_id']);
            $table->dropForeign(['procedure_id']);
        });

        Schema::dropIfExists('procedures');
    }
}

