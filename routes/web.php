<?php

use App\Http\Controllers\AdjudicacioneController;
use App\Http\Controllers\ContratoController;
use App\Http\Controllers\MovimientoController;
use App\Http\Controllers\TipoController;
use App\Models\Movimiento;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

    Route::middleware(['auth'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['force.login'])->group(function(){
    Route::get('/movimientos',[MovimientoController::class,'index'])->middleware('auth')->name('movimientos');

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    Route::get('/contratos', [ContratoController::class, 'index'])->name('contratos');

    Route::get('/contratos/create', [ContratoController::class, 'create'])->name('contratos.create');

    Route::post('/contratos/store', [ContratoController::class, 'store'])->name('contratos.store');

    Route::get('/contratos/show/{contrato}', [ContratoController::class, 'show'])->name('contratos.show');

    Route::get('/contratos/edit/{contrato}', [ContratoController::class, 'edit'])->name('contratos.edit');

    Route::put('/contratos/update/{contrato}', [ContratoController::class, 'update'])->name('contratos.update');

    Route::delete('/contratos/destroy/{contrato}',[ContratoController::class,'destroy'])->name('contratos.destroy');

    Route::get('/contratos/desactivados',[ContratoController::class,'verDesactivados'])->name('desactivados');

    Route::put('/contratos/recuperar/{contrato_id}',[ContratoController::class,'recuperarDesactivados'])->name('recuperar');

    Route::get('/contratos/{contrato}/movimientos', [ContratoController::class, 'verMovimiento'])->name('contratos.movimientos');

    Route::get('/contratos/{id}/silenciar', [ContratoController::class, 'silenciarAlerta'])
        ->name('contrato.silenciar')
        ->middleware(['signed','auth']);
    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    Route::get('/procedimientos',[AdjudicacioneController::class,'index'])->name('procedimientos');
    Route::get('/procedimientos/create',[AdjudicacioneController::class,'create'])->name('procedimientos.create');
    Route::get('/procedimientos/{procedimiento}/edit',[AdjudicacioneController::class,'edit'])->name('procedimientos.edit');
    Route::post('/procedimientos/store',[AdjudicacioneController::class,'store'])->name('procedimientos.store');

    Route::get('/procedimientos/{procedimiento}/show',[AdjudicacioneController::class,'show'])->name('procedimientos.show');
    Route::delete('/procedimientos/{procedimiento}/destroy',[AdjudicacioneController::class,'destroy'])->name('procedimientos.destroy');

    ////////////////////////////////////////////////////////////////////////////////////////////////////////

    Route::get('/tipos',[TipoController::class,'index'])->name('tipos');
    Route::get('/tipos/create',[TipoController::class,'create'])->name('tipos.create');
    Route::post('/tipos/store',[TipoController::class,'store'])->name('tipos.store');
    Route::delete('/tipos/{tipo}/destroy',[TipoController::class,'destroy'])->name('tipos.destroy');

});









require __DIR__.'/settings.php';
