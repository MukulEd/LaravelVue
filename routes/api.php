<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login','AuthController@login')->name('login');
Route::post('/register','AuthController@register')->name('register');
Route::group(['middleware' => 'auth:api'], function () { 

    Route::post('/logout','AuthController@logout')->name('logout');
    Route::get('/me','AuthController@userProfile')->name('user.profile');

    //todo routes
    Route::get('/todo','ToDoController@getAllList')->name('getall.todo.list');
    Route::get('/todo/{id}','ToDoController@getList')->name('get.todo.list');
    Route::post('/todo','ToDoController@storeList')->name('store.todo.list');
    Route::put('/todo','ToDoController@editList')->name('edit.todo.list');
    Route::delete('/todo/{id}','ToDoController@deleteList')->name('delete.todo.list');
});

