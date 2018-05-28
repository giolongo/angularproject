<?php
/**
 * Autobot project.
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Dipendente;

/**
 *
 *@deprecated See WebHookVotaController
 */
class FerieController extends Controller
{
    public function test1(Request $request)
    {
        //$data = $request->all();
        //$data['banana'];
        //return response("OK!", 200);
        //return response("Banana non trovata", 404);
        return "test1";
    }
    
    public function test2(Request $request)
    {
        //Dipendente::where("id_dipendente", "=", 1)->orderBy("nome", "ask")->get()->toArray();
        //$dipendenti = Dipendente::where("id_dipendente", "=", 1)->orderBy("nome", "ask")->get();
        /*
        foreach($dipendenti as $dipendente){
            $dipendente->nome = $dipendente->nome."banana!";
            $dipendente->save();
        }
        
        */
        return "test2";
    }
}
