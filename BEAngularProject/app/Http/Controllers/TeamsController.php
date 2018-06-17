<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\angularproject\CommonFunction;
use App\Models\Team;
class TeamsController extends Controller
{
    public function __construct()
    {}

    public function getTeam(Request $request){
        $token = $request->get('token');
        $id_team = $request->get('id_team');
        $user = CommonFunction::tokenToDipendente($token);
        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }else{
            $team = Team::where("id_team", "=", $id_team)->with('teamDipendente.dipendente.skill.skill')->with("teamCapoTeam")->get();
            return response()->json([
                'success' => true, 
                'data'=> $team->toArray()
            ]);
        }
    }
}