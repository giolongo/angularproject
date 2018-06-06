<?php
/**
 * Autobot project.
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use App\Models\Dipendente;
use App\Models\Permessi;
use App\Models\Sottoposti;
use Carbon\Carbon;
use App\angularproject\CommonFunction;
use Hash;
/**
 *
 *@deprecated See WebHookVotaController
 */
class FerieController extends Controller
{
    public function __construct()
    {
        //$this->middleware('auth');
    }

    public function getListaRichiesteDipendente(Request $request){
        $user = CommonFunction::tokenToDipendente($request->get('token'));
        if(empty($user)){
            return CommonFunction::genericUnauthorizedAccess();
        }
        $permessi = Permessi::where('id_dipendente', '=', $user->id)->where('stato', '!=', 'approvato')->get()->toArray();
        return response()->json(['success' => true, 'message' => json_encode($permessi)]);
    }

    public function generateMockData(Request $request)
    {
        //endpoint
        //http://localhost/angularproject/be/generateMockData

        //Empty DB
        DB::statement("SET foreign_key_checks=0");
        Dipendente::truncate();
        Sottoposti::truncate();
        Permessi::truncate();
        DB::statement("SET foreign_key_checks=1");
        
        //Fill DB
        $mockList = [
            [
                'nome' => 'Orazio',
                'cognome' => 'Contarino',
                'email' => 'ocontarino@gmail.com',
                'ruolo' => 'manager',
                'codice_fiscale' => 'cntrzo94p28c351t', 
                'data_nascita' => Carbon::now(), 
                'password' => Hash::make('orazio'),
                'is_verified' => 1
            ],
            [
                'nome' => 'Giovanni',
                'cognome' => 'Longo',
                'email' => 'aaa@gmail.com',
                'ruolo' => 'manager',
                'codice_fiscale' => 'cntrzo94p28c352t', 
                'data_nascita' => Carbon::now(), 
                'password' => Hash::make('orazio'),
                'is_verified' => 1
            ],
            [
                'nome' => 'Mario',
                'cognome' => 'Rossi',
                'email' => 'bbb@gmail.com',
                'ruolo' => 'dipendente',
                'codice_fiscale' => 'cntrzo94p28c353t', 
                'data_nascita' => Carbon::now(), 
                'password' => Hash::make('orazio'),
                'is_verified' => 1
            ],
            [
                'nome' => 'Turi',
                'cognome' => 'Bianchi',
                'email' => 'ccc@gmail.com',
                'ruolo' => 'dipendente',
                'codice_fiscale' => 'cntrzo94p28c354t', 
                'data_nascita' => Carbon::now(), 
                'password' => Hash::make('orazio'),
                'is_verified' => 1
            ],
            [
                'nome' => 'Carmelo',
                'cognome' => 'Verdi',
                'email' => 'ddd@gmail.com',
                'ruolo' => 'dipendente',
                'codice_fiscale' => 'cntrzo94p28c355t', 
                'data_nascita' => Carbon::now(), 
                'password' => Hash::make('orazio'),
                'is_verified' => 1
            ],
        ];

        $manager_id = null;
        $random_dipendente_id = null;
        foreach($mockList as $key => $value){
            $element = Dipendente::create($value);
            if($value['nome']=='Orazio'){
                $manager_id = $element->id_dipendente;
            }else if($value['nome']!='Giovanni'){
                Sottoposti::create([
                    'id_capo' => $manager_id,
                    'id_dipendente' => $element->id_dipendente,
                ]);
                Permessi::create([
                    'id_dipendente' => $element->id_dipendente,
                    'data_inizio' => Carbon::now(),
                    'data_fine' => Carbon::tomorrow(),
                    'note' => 'Nota di prova',
                    'tipologia' => 'ferie',
                    'stato' => 'approvato'
                ]); 
                
                Permessi::create([
                    'id_dipendente' => $element->id_dipendente,
                    'data_inizio' => Carbon::tomorrow(),
                    'data_fine' => Carbon::tomorrow(),
                    'note' => 'Nota di prova',
                    'tipologia' => 'ferie',
                    'stato' => 'rifiutato'
                ]); 

                Permessi::create([
                    'id_dipendente' => $element->id_dipendente,
                    'data_inizio' => Carbon::yesterday(),
                    'data_fine' => Carbon::tomorrow(),
                    'note' => 'Nota di prova',
                    'tipologia' => 'ferie',
                    'stato' => 'pending'
                ]); 

                Permessi::create([
                    'id_dipendente' => $element->id_dipendente,
                    'data_inizio' => Carbon::now(),
                    'data_fine' => Carbon::tomorrow(),
                    'note' => 'Nota di prova',
                    'tipologia' => 'malattia',
                    'stato' => 'approvato'
                ]); 
                
                Permessi::create([
                    'id_dipendente' => $element->id_dipendente,
                    'data_inizio' => Carbon::tomorrow(),
                    'data_fine' => Carbon::tomorrow(),
                    'note' => 'Nota di prova',
                    'tipologia' => 'malattia',
                    'stato' => 'rifiutato'
                ]); 

                Permessi::create([
                    'id_dipendente' => $element->id_dipendente,
                    'data_inizio' => Carbon::yesterday(),
                    'data_fine' => Carbon::tomorrow(),
                    'note' => 'Nota di prova',
                    'tipologia' => 'malattia',
                    'stato' => 'pending'
                ]); 
            }
        }

    }

    public function selectSottoposti(Request $request){
        $managers_list = Dipendente::where('ruolo', '=', 'manager')->get();
        $json_response = [];
        foreach($managers_list as $element){
            Log::debug("Nome: ".$element->nome." cognome: ".$element->cognome);
            $sottoposti_list = Dipendente::where("id_dipendente", "=", $element->id_dipendente)->with('sottoposti.dipendente')->get()->toArray();
            Log::debug(print_r($sottoposti_list,true));
        }
        //Logs in angularproject/BEAngularProject/storage/logs/laravel.log
        return response("Success!", 200);
    }
    public function test1(Request $request)
    {
        //$data = $request->all();
        //$data['banana'];
        //return response('OK!', 200);
        //return response('Banana non trovata', 404);
        return 'test1';
    }
    
    public function test2(Request $request)
    {
        //Dipendente::where('id_dipendente', '=', 1)->orderBy('nome', 'ask')->get()->toArray();
        //$dipendenti = Dipendente::where('id_dipendente', '=', 1)->orderBy('nome', 'ask')->get();
        /*
        foreach($dipendenti as $dipendente){
            $dipendente->nome = $dipendente->nome.'banana!';
            $dipendente->save();
        }
        
        */
        return 'test2';
    }
}
