<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\angularproject\CommonFunction;
use App\Models\Dipendente;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class UtenteController extends Controller
{
    public function __construct()
    {}

    public function updateUser(Request $request){
        $user = CommonFunction::tokenToDipendente($request->get('token'));

        $nome = $request->get('nome');
        $cognome = $request->get('cognome');
        $email= $request->get('email');
        //$data_nascita=new Carbon($request->get('dataDiNascita'));
        $iban=$request->get('iban');
        $banca=$request->get('banca');
        $bbc=$request->get('bbc');
        $password=Hash::make($request->get('password'));

        Dipendente::where([["id_dipendente", "=", $user->id_dipendente]])
        ->update([
            "nome" => $nome,
            "cognome" => $cognome,
            "email"=> $email,
            "iban"=>$iban,
            "banca"=>$banca,
            "bbc"=>$bbc,
            "password"=>$password
        ]);

        return response()->json([
            'success' => true, 
        ]);
    }
    
}