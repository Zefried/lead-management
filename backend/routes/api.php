<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\GoogleEventController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Route::post('testing', [AuthController::class, 'testing'])->middleware('auth:sanctum');

// Route::get('token', [AuthController::class, 'tokenTest'])->middleware('auth:sanctum');

// Route to redirect to Google OAuth consent screen
Route::get('auth/google', [AuthController::class, 'redirectToGoogle']);

// Route to handle the callback from Google
Route::get('auth/{provider}/callback', [AuthController::class, 'handleCallback']);



Route::middleware(['auth:sanctum'])->group(function () {

    // next task create admin route 

    Route::get('logout', [AuthController::class, 'logout'])->name('logout');

    // handling category creation for and delete for admin
    Route::post('admin/add-category', [CategoryController::class, 'addCategory'])->name('addCategory');
    Route::get('admin/view-category', [CategoryController::class, 'viewCategory'])->name('viewCategory');
    Route::get('admin/edit-category/{id}', [CategoryController::class, 'editCategory'])->name('editCategory');
    Route::post('admin/update-category/{id}', [CategoryController::class, 'updateCategory'])->name('updateCategory');
    Route::get('admin/delete-category/{id}', [CategoryController::class, 'deleteCategory'])->name('deleteCategory');
    // category handling ends here 


     // handling category creation for and delete for admin
     Route::post('admin/add-client', [ClientController::class, 'addClient'])->name('addClient');
     Route::get('admin/view-client', [ClientController::class, 'ViewClient'])->name('viewClient');
     Route::get('admin/edit-client/{id}', [ClientController::class, 'editClient'])->name('editClient');
     Route::post('admin/update-client/{id}', [ClientController::class, 'updateClient'])->name('updateClient');
     Route::get('admin/delete-client/{id}', [ClientController::class, 'deleteClient'])->name('deleteClient');
    
     // category handling ends here 





    Route::post('create-event', [GoogleEventController::class, 'eventCrud'])->name('eventCrud');



});