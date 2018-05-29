<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dipendente extends Model
{
    protected $table = 'dipendente';
    
    protected $guarded = [];
    
    protected $primaryKey = 'id_dipendente';

    public $timestamps = false;
    
    protected $fillable = [
        'nome',
        'cognome',
        'email',
        'ruolo'
    ];

    public function sottoposti()
    {
        return $this->hasMany('App\Sottoposti', 'id_capo', 'id_dipendente');
    }
    /* RELATION EXAMPLES */
    /*
    public function attachment()
    {
        return $this->belongsTo('App\Models\Attachment', 'attachment_id', 'id');
    }
    public function bot_info()
    {
        return $this->belongsTo('App\Models\Bot', 'bot_id', 'bot_id');
    } 
    public function notification()
    {
        return $this->belongsTo('App\Models\Notification', 'id', 'feedbackmsg_id');
    }
    public function admin_sender()
    {
        return $this->hasOne('App\Models\User', 'id', 'admin_sender_id');
    }
    */
}
