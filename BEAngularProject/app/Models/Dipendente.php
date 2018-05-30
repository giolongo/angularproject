<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Dipendente extends Authenticatable
{
    use Notifiable;

    protected $table = 'dipendente';
    
    protected $guarded = [];
    
    protected $primaryKey = 'id_dipendente';

    public $timestamps = false;
    
    protected $fillable = [
        'nome',
        'cognome',
        'email',
        'ruolo',
        'codice_fiscale',
        'data_nascita',
        'email',
        'password',
        'iban',
        'banca',
        'bbc'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
    
    public function sottoposti()
    {
        return $this->hasMany('App\Sottoposti', 'id_capo', 'id_dipendente');
    }

    public function skill()
    {
        return $this->hasMany('App\SkillDipendente', 'id_dipendente', 'id_dipendente');
    }
}
