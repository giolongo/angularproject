<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Auth routes
Route::match(array('GET','POST'), 'validateToken', 'AuthController@validateToken');
Route::post('register', 'AuthController@register');
Route::post('login', 'AuthController@login');
//Route::post('recover', 'AuthController@recover');
Route::group(['middleware' => ['jwt.auth']], function() {
    Route::get('logout', 'AuthController@logout');
    Route::get('test', function(){
        return response()->json(['foo'=>'bar']);
    });
});
//Route::get('user/verify/{verification_code}', 'AuthController@verifyUser');
//Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.request');
//Route::post('password/reset', 'Auth\ResetPasswordController@postReset')->name('password.reset');

//Routes Orazio Contarino (Gestione permessi)
//Registra permesso
Route::match(array('GET','POST'),'getPermessiEnumArray', 'GestionePermessiController@getPermessiEnumArray');
Route::match(array('GET','POST'),'registraPermesso', 'GestionePermessiController@registraPermesso');
Route::match(array('GET','POST'),'getListaPermessiDipendente', 'GestionePermessiController@getListaPermessiDipendente');

//deprecati
Route::match(array('GET','POST'),'urlDaInvocare1', 'GestionePermessiController@test1');
Route::match(array('GET','POST'),'urlDaInvocare2', 'GestionePermessiController@test2');
Route::match(array('GET','POST'),'generateMockData', 'GestionePermessiController@generateMockData');
Route::match(array('GET','POST'),'selectSottoposti', 'GestionePermessiController@selectSottoposti');
Route::match(array('GET','POST'),'/getListaRichiesteDipendente', 'GestionePermessiController@getListaRichiesteDipendente')->middleware('jwt.auth');

//Routes Giovanni Emanuele Longo
Route::match(array('GET','POST'),'generateMockDataGiovanni', 'SkillAndTeamController@generateMockDataGiovanni');
Route::match(array('GET','POST'),'getDatiUtente', 'HomeController@getDatiUtente')->middleware('jwt.auth');
Route::match(array('GET','POST'),'getSkills', 'SkillsController@getSkills')->middleware('jwt.auth');
Route::match(array('GET'),'getListSkills', 'SkillsController@getListSkills');
Route::match(array('POST'),'aggiungiModificaSkill', 'SkillsController@aggiungiModificaSkill');
Route::match(array('POST'),'rimuoviSkill', 'SkillsController@rimuoviSkill');
Route::match(array('PUT'),'updateUser', 'UtenteController@updateUser');