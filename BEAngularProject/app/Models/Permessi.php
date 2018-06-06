<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permessi extends Model
{
    protected $table = 'permessi';
    
    protected $guarded = [];
    
    protected $primaryKey = 'id';
    
    public $timestamps = false;
    
    protected $fillable = [
        'id_dipendente',
        'data_inizio',
        'data_fine',
        'note',
        'tipologia',
        'stato'
    ];
    public function dipendente()
    {
        return $this->hasOne('App\Models\Dipendente', 'id_dipendente', 'id_dipendente');
    }
}
