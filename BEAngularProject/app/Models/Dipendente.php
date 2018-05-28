<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dipendente extends Model
{
    protected $table = 'dipendente';
    
    protected $guarded = [];
    
    protected $primaryKey = 'id_dipendente';
    
    protected $fillable = [
        'bot_id',
        'nome',
        'cognome',
        'email',
        'id_ruolo'
    ];
    
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
