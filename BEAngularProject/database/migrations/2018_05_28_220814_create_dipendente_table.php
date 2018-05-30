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
            $table->string('nome')->nullable(false);
            $table->string('cognome')->nullable(false);
            $table->string('email')->nullable(false);
            $table->string('codice_fiscale')->unique()->nullable(false);
            $table->timestamp('data_nascita')->nullable(false);
            $table->string('password')->nullable(false);
            $table->string('iban')->unique()->nullable(false);
            $table->enum('banca' , ['Monte Paschi', 'Poste Italiane']);
            $table->string('bbc')->nullable(false);
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
