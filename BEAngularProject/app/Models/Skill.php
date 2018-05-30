<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $table = 'skill';
    
    protected $guarded = [];
    
    protected $primaryKey = 'id_skill';

    public $timestamps = false;
    
    protected $fillable = [
        'nome'
    ];

    public function skillDipendente()
    {
        return $this->hasOne('App\SkillDipendente', 'id_skill', 'id_skill');
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
