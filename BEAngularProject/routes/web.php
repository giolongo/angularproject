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

Route::match(array('GET','POST'),'urlDaInvocare1', 'FerieController@test1');
Route::match(array('GET','POST'),'urlDaInvocare2', 'FerieController@test2');
Route::match(array('GET','POST'),'generateMockData', 'FerieController@generateMockData');
Route::match(array('GET','POST'),'selectSottoposti', 'FerieController@selectSottoposti');


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
