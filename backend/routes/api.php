<?php

use App\Http\Controllers\adminFollowUpController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\GoogleEventController;
use App\Http\Controllers\statusMasterController;
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

    // Handling category crud starts from here
    Route::post('admin/add-category', [CategoryController::class, 'addCategory'])->name('addCategory');
    Route::get('admin/view-category', [CategoryController::class, 'viewCategory'])->name('viewCategory');
    Route::get('admin/edit-category/{id}', [CategoryController::class, 'editCategory'])->name('editCategory');
    Route::post('admin/update-category/{id}', [CategoryController::class, 'updateCategory'])->name('updateCategory');
    Route::get('admin/delete-category/{id}', [CategoryController::class, 'deleteCategory'])->name('deleteCategory');
    // category handling ends here 


     // handling client curd starts from here
     Route::post('admin/add-client', [ClientController::class, 'addClient'])->name('addClient');
     Route::get('admin/view-client', [ClientController::class, 'ViewClient'])->name('viewClient');
     Route::get('admin/edit-client/{id}', [ClientController::class, 'editClient'])->name('editClient');
     Route::post('admin/update-client/{id}', [ClientController::class, 'updateClient'])->name('updateClient');
     Route::get('admin/delete-client/{id}', [ClientController::class, 'deleteClient'])->name('deleteClient');
     // handling client ends here 

    // handling client curd starts from here
     Route::post('admin/add-status', [statusMasterController::class, 'addStatus'])->name('addStatus');
     Route::get('admin/view-status', [statusMasterController::class, 'viewStatus'])->name('viewStatus');
     Route::get('admin/edit-status/{id}', [statusMasterController::class, 'editStatus'])->name('editStatus');
     Route::post('admin/update-status/{id}', [statusMasterController::class, 'updateStatus'])->name('updateStatus');
     Route::get('admin/delete-status/{id}', [statusMasterController::class, 'deleteStatus'])->name('deleteStatus');
    // handling client ends here 


     // handling admin event creation, starts from here
     Route::post('admin/add-followup', [adminFollowUpController::class, 'addFollowup'])->name('addFollowup');
     Route::get('admin/view-followup', [adminFollowUpController::class, 'viewFollowUp'])->name('viewFollowUp');
     Route::get('admin/edit-followups/{id}', [adminFollowUpController::class, 'editFollowup'])->name('editFollowup');
     Route::post('admin/update-followups/{id}', [adminFollowUpController::class, 'updateFollowup'])->name('updateFollowup');
     Route::get('admin/delete-followups/{id}', [adminFollowUpController::class, 'deleteFollowup'])->name('deleteFollowup');
     Route::get('admin/fetch-status-master', [adminFollowUpController::class, 'fetchStatusMaster'])->name('fetchStatusMaster');
     Route::post('admin/update-followup-status', [adminFollowUpController::class, 'updateFollowupStatus'])->name('updateFollowupStatus');
     // Admin event creation ends here

    // Route::post('create-event', [GoogleEventController::class, 'eventCrud'])->name('eventCrud');

});