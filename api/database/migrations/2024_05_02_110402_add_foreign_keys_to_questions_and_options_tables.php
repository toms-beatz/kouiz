<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddForeignKeysToQuestionsAndOptionsTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->bigInteger('kouiz_id')->unsigned();
            $table->foreign('kouiz_id')->references('id')->on('kouiz')->onDelete('cascade');
        });

        Schema::table('options', function (Blueprint $table) {
            $table->bigInteger('question_id')->unsigned();
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->dropForeign(['option_id']);
        });

        Schema::table('options', function (Blueprint $table) {
            $table->dropForeign(['question_id']);
        });
    }
}