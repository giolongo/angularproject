<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Team;
use App\Models\Dipendente;
use App\angularproject\CommonFunction;
use Illuminate\Support\Facades\Log;
class RicercaController extends Controller
{
    public function __construct()
    {}

    public function getRisulatatiRicerca(Request $request){
        $token = $request->get('token');
        $user = CommonFunction::tokenToDipendente($token);
        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }else{
            $list = Dipendente::get();
            Log::debug(print_r($list->toArray(),true));
            //where("nome", "=", $nome)
            return response()->json([
                'success' => true, 
                'data'=> $list->toArray()
            ]);
        }
    }

}