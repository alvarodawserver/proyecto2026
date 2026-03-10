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
        $this->registrarMovimiento($contrato, 'Creación', 'Se ha registrado el contrato inicialmente.');
    }

    /**
     * Handle the Contrato "updated" event.
     */
    public function updated(Contrato $contrato): void
    {
        $this->registrarMovimiento($contrato, 'Modificación', 'Se han actualizado los datos del contrato.');
    }

    /**
     * Handle the Contrato "deleted" event.
     */
    public function deleted(Contrato $contrato): void
    {
        $this->registrarMovimiento($contrato, 'Eliminación', 'El contrato ha sido desactivado');
    }

    /**
     * Handle the Contrato "restored" event.
     */
    public function restored(Contrato $contrato): void
    {
        $this->registrarMovimiento($contrato, 'Restauración', 'El contrato ha sido restaurado');
    }

    /**
     * Handle the Contrato "force deleted" event.
     */
    public function forceDeleted(Contrato $contrato): void
    {
        //
    }

    private function registrarMovimiento($contrato,$actuacion,$observacion){
        Movimiento::create([
        'usuario_id' => $contrato->created_by,
        'contrato_id' => $contrato->id,
        'fecha_movimiento' => now(),
        'actuacion' => $actuacion,
        'observaciones' => $observacion,
        ]);
    }
}
