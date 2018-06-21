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
        $data_nascita=new Carbon($request->get('dataDiNascita'));
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
            "data_nascita"=> $data_nascita,
            "banca"=>$banca,
            "bbc"=>$bbc,
            "password"=>$password
        ]);

        return response()->json([
            'success' => true, 
        ]);
    }

    public function addUser(Request $request){
        $user = CommonFunction::tokenToDipendente($request->get('token'));

        $nome = $request->get('nome');
        $cognome = $request->get('cognome');
        $email= $request->get('email');
        $password=Hash::make($request->get('password'));
        $codice_fiscale=$request->get('codice_fiscale');
        $ruolo=$request->get('ruolo');
        $data_nascita = new Carbon($request->get('data'));
        if(empty($user)){
            return response()->json(['success' => false, 'error' => 'Invalid token']);
        }else{
            $utente = Dipendente::where("codice_fiscale","=",$codice_fiscale)->get();
            if(!count($utente)){
                $utente = Dipendente::create([
                    'nome'=> $nome,
                    'cognome'=> $cognome,
                    'email'=>$email,
                    'password'=>$password,
                    'codice_fiscale'=>$codice_fiscale,
                    'ruolo'=>$ruolo,
                    'data_nascita' => $data_nascita,
                    'iban' => 'iban',
                    'banca' => 'Poste Italiane',
                    'bbc' => 'bbc']);
                return response()->json([
                    'success' => true, 
                    'data' => $utente->toArray()
                ]);    
            }else{
                return response()->json([
                    'success' => false, 
                    'error' => 'Codice Fiscale già presente'
                ]); 
            }
        }
    }
    
}