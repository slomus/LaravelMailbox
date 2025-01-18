<?php

use App\Http\Controllers\EmailAccountController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/home', function () {
    return Inertia::render('Home');
});


Route::middleware(['auth', 'verified'])->group(function(){
    Route::get('/poczta', [EmailAccountController::class, 'getAllFolders'])->name('poczta.folders');
});

Route::middleware('auth')->group(function () {
    Route::get('/profiles/email', [EmailAccountController::class, 'edit'])->name('profiles.email');
    Route::post('/profiles/email', [EmailAccountController::class, 'store'])->name('profiles.store');
    Route::patch('/profiles/email', [EmailAccountController::class, 'update'])->name('profiles.update');
    Route::patch('profiles/email/{id}', [EmailAccountController::class, 'update'])->name('email-accounts.update');
    Route::delete('profiles/email/{id}', [EmailAccountController::class, 'destroy'])->name('email-accounts.destroy');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
