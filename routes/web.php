<?php

use App\Http\Controllers\ContratoController;
use App\Http\Controllers\MovimientoController;
use App\Http\Controllers\UnidadPromotoraController;
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


    Route::get('/contratos/show/{contrato}', [ContratoController::class, 'show'])->name('contratos.show');


    Route::get('/contratos/edit/{contrato}', [ContratoController::class, 'edit'])->name('edit');

    Route::put('/contratos/update/{contrato}', [ContratoController::class, 'update'])->name('contratos.update');

    Route::delete('/contratos/destroy/{contrato}',[ContratoController::class,'destroy'])->name('contratos.destroy');

    Route::get('/contratos/desactivados',[ContratoController::class,'verDesactivados'])->name('desactivados');

    Route::put('/contratos/recuperar/{contrato_id}',[ContratoController::class,'recuperarDesactivados'])->name('recuperar');


 Route::get('/unidad_promotoras', [UnidadPromotoraController::class, 'index'])->name('unidad_promotoras');


    Route::get('/unidad_promotoras/create', [UnidadPromotoraController::class, 'create'])->name('unidad_promotoras.create');


    Route::post('/unidad_promotoras/store', [UnidadPromotoraController::class, 'store'])->name('unidad_promotoras.store');

    Route::delete('/unidad_promotoras/destroy/{unidad_promotora}',[UnidadPromotoraController::class,'destroy'])->name('unidad_promotoras.destroy');


require __DIR__.'/settings.php';
