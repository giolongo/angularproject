<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $table = 'team';
    
    protected $guarded = [];
    
    protected $primaryKey = 'id_team';

    public $timestamps = false;
    
    protected $fillable = [
        'id_capo_team'
    ];

    public function teamDipendente()
    {
        return $this->hasMany('App\TeamDipendente', 'id_team', 'id_team');
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
