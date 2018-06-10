<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\angularproject\CommonFunction;
use App\Models\SkillDipendente;
use App\Models\Skill;
class SkillsController extends Controller
{
    public function __construct()
    {}

    public function getSkills(Request $request){
        $token = $request->get('token');
        $user = CommonFunction::tokenToDipendente($token);
        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }else{
            $skill_list = SkillDipendente::where("id_dipendente", "=", $user->id_dipendente)->with('skill')->get();
            return response()->json([
                'success' => true, 
                'data'=> $skill_list->toArray()
            ]);
        }
    }

    public function getListSkills(){
        $skill_list = Skill::get();
        return response()->json([
            'success' => true, 
            'data'=> $skill_list->toArray()
        ]);
    }

    public function aggiungiModificaSkill(Request $request){
        $token = $request->get('token');
        $id_skill = $request->get('id_skill');
        $seniority = $request->get('seniority');

        $user = CommonFunction::tokenToDipendente($token);

        $skills = SkillDipendente::where([["id_dipendente", "=", $user->id_dipendente]
        ])->get();
        $trovato = false;
        foreach($skills as $skill){
            if($skill->id_skill == $id_skill){
                $trovato=true;
                if($skill->seniority != $seniority){
                    SkillDipendente::where([["id_dipendente", "=", $user->id_dipendente],
                    ["id_skill","=",$id_skill]
                    ])->update(['seniority' => $seniority]);
                }
            }
        }
        if(! $trovato){
            SkillDipendente::create([
                'id_dipendente' => $user->id_dipendente,
                'id_skill' =>  $id_skill,
                'seniority' => $seniority
            ]);
        }
        return response()->json([
            'success' => true, 
        ]);
    }

    public function rimuoviSkill(Request $request){
        $token = $request->get('token');
        $id_skill = $request->get('id_skill');

        $user = CommonFunction::tokenToDipendente($token);
        SkillDipendente::where([["id_dipendente", "=", $user->id_dipendente],
        ["id_skill","=",$id_skill]
        ])->delete();
        
        return response()->json([
            'success' => true, 
        ]);
    }
}