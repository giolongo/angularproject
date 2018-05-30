<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDipendenteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dipendente', function (Blueprint $table) {
            $table->increments('id_dipendente');
            $table->string('nome');
            $table->string('cognome');
            $table->string('email');
            $table->string('codice_fiscale')->unique();
            $table->timestamp('data_nascita');
            $table->string('email')->unique();
            $table->string('password');
            $table->enum('ruolo', ['manager', 'dipendente']);	
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dipendente');
    }
}
