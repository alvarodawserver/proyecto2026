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
// Rutas de Contratos

    Route::get('/contratos', [ContratoController::class, 'index'])->name('contratos');


    Route::get('/contratos/create', [ContratoController::class, 'create'])->name('contratos.create');


    Route::post('/contratos/store', [ContratoController::class, 'store'])->name('contratos.store');


    Route::get('/contratos/show/{contrato_id}', [ContratoController::class, 'show'])->name('contratos.show');


    Route::get('/contratos/edit/{id}', [ContratoController::class, 'edit'])->name('contratos.edit');
    
    Route::put('/contratos/update/{id}', [ContratoController::class, 'update'])->name('contratos.update');





require __DIR__.'/settings.php';
