<?php

namespace App\Observers;

use App\Models\Contrato;
use App\Models\Movimiento;

class ContratoObserver
{
    /**
     * Handle the Contrato "created" event.
     */
    public function created(Contrato $contrato): void
    {
        Movimiento::create([
        'user_id' => $contrato->created_by,
        'contrato_id' => $contrato->id,
        'fecha_movimiento' => now(),
        'actuacion' => 'Creación',
        'observaciones' => 'Se ha dado de alta el contrato con expediente: ' . $contrato->n_expediente,
        ]);
    }

    /**
     * Handle the Contrato "updated" event.
     */
    public function updated(Contrato $contrato): void
    {
        Movimiento::create([
        'user_id' => $contrato->created_by,
        'contrato_id' => $contrato->id,
        'fecha_movimiento' => now(),
        'actuacion' => 'Creación',
        'observaciones' => 'Se ha dado de alta el contrato con expediente: ' . $contrato->n_expediente,
        ]);
    }

    /**
     * Handle the Contrato "deleted" event.
     */
    public function deleted(Contrato $contrato): void
    {
        Movimiento::create([
        'user_id' => $contrato->created_by,
        'contrato_id' => $contrato->id,
        'fecha_movimiento' => now(),
        'actuacion' => 'Creación',
        'observaciones' => 'Se ha dado de alta el contrato con expediente: ' . $contrato->n_expediente,
        ]);
    }

    /**
     * Handle the Contrato "restored" event.
     */
    public function restored(Contrato $contrato): void
    {
        //
    }

    /**
     * Handle the Contrato "force deleted" event.
     */
    public function forceDeleted(Contrato $contrato): void
    {
        //
    }
}
