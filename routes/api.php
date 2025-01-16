<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailAccountController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/email-accounts', [EmailAccountController::class, 'store']);
    Route::get('/email-accounts/folders', [EmailAccountController::class, 'getAllFolders']);
});

