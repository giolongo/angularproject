<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SkillDipendente extends Model
{
    protected $table = 'skill_dipendente';
    
    protected $guarded = [];
    
    protected $primaryKey = 'id';

    public $timestamps = false;
    
    protected $fillable = [
        'id_skill',
        'id_dipendente'
    ];

    public function skill()
    {
        return $this->hasMany('App\Skill', 'id_skill', 'id_skill');
    }

    public function dipendente()
    {
        return $this->hasOne('App\Dipendente', 'id_dipendente', 'id_dipendente');
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
