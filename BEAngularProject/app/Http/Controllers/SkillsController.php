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
}