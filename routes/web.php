<?php

use App\Http\Controllers\ContratoController;
use App\Http\Controllers\MovimientoController;
use App\Http\Controllers\UserController;
use App\Models\Movimiento;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::get('/movimientos',[MovimientoController::class,'index'])->middleware('auth','verified')->name('movimientos');
Route::get('/contratos',[ContratoController::class,'index'])->middleware('auth','verified')->name('contratos');
Route::get('/contratos/create',[ContratoController::class,'create'])->middleware('auth','verified')->name('createcontratos');
Route::put('/contratos/edit',[ContratoController::class,'edit'])->middleware('auth','verified')->name('editcontratos');
Route::get('/contratos/show/{contrato_id}',[ContratoController::class,'show'])->middleware('auth','verified')->name('showcontratos');





require __DIR__.'/settings.php';
