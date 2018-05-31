<?php
/**
 * Autobot project.
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Dipendente;
use App\Permessi;
use App\Sottoposti;
use Carbon\Carbon;
/**
 *
 *@deprecated See WebHookVotaController
 */
class FerieController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function generateMockData(Request $request)
    {
        //endpoint
        //http://localhost/angularproject/be/generateMockData

        //Empty DB
        Dipendente::truncate();
        Sottoposti::truncate();
        Permessi::truncate();
        
        //Fill DB
        $mockList = [
            [
                'nome' => 'Orazio',
                'cognome' => 'Contarino',
                'email' => 'ocontarino@gmail.com',
                'ruolo' => 'manager'
            ],
            [
                'nome' => 'Giovanni',
                'cognome' => 'Longo',
                'email' => 'aaa@gmail.com',
                'ruolo' => 'manager'
            ],
            [
                'nome' => 'Mario',
                'cognome' => 'Rossi',
                'email' => 'bbb@gmail.com',
                'ruolo' => 'dipendente'
            ],
            [
                'nome' => 'Turi',
                'cognome' => 'Bianchi',
                'email' => 'ccc@gmail.com',
                'ruolo' => 'dipendente'
            ],
            [
                'nome' => 'Carmelo',
                'cognome' => 'Verdi',
                'email' => 'ddd@gmail.com',
                'ruolo' => 'dipendente'
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
