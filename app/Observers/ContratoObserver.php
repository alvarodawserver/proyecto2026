<?php

namespace App\Observers;

use App\Models\Contrato;
use App\Models\Movimiento;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ContratoObserver
{
    public function created(Contrato $contrato): void
    {


        $distribucion = DB::table('per_distribucion')
        ->where('per_distribucion_empleado', Auth::user()->empleado_id)
        ->where('per_distribucion_dpto_principal', true)
        ->first();


        $departamento_id = $distribucion ? $distribucion->per_distribucion_departamento :
            DB::table('per_distribucion')
                ->where('per_distribucion_empleado', Auth::user()->empleado_id)
                ->value('per_distribucion_departamento');

        if ($departamento_id) {
            $id_contrato_formateado = $departamento_id . '-' . str_pad($contrato->id, 2, '0', STR_PAD_LEFT);

            $contrato->timestamps = false;
            $contrato->updateQuietly([
                'id_contrato' => $id_contrato_formateado
            ]);
        }




        $this->registrarMovimiento($contrato, 'Creación', 'Se ha registrado el contrato inicialmente.');
    }

    public function updated(Contrato $contrato): void
    {
        if ($contrato->wasChanged('deleted_at')) {
            return;
        }

        if ($contrato->wasChanged('formalizado') && $contrato->formalizado) {
            $this->formalizado($contrato);
            return;
        }

        $this->registrarMovimiento($contrato, 'Modificación', 'Se han actualizado los datos del contrato.');
    }

    public function deleted(Contrato $contrato): void
    {
        $this->registrarMovimiento($contrato, 'Dado de baja', 'El contrato ha sido desactivado');
    }

    public function forceDeleted(Contrato $contrato): void
    {
        $this->registrarMovimiento($contrato, 'Eliminación Permanente', 'El contrato ha sido eliminado permanentemente');
    }


    public function formalizado(Contrato $contrato): void{
            $this->registrarMovimiento($contrato,'Formalización','El contrato ha sido formalizado');
    }
    
    public function restored(Contrato $contrato): void
    {
        $this->registrarMovimiento($contrato, 'Restauración', 'El contrato ha sido restaurado');
    }


    private function registrarMovimiento($contrato, $actuacion, $observacion)
    {
        Movimiento::create([
            'usuario_id'        => Auth::id() ?? $contrato->created_by,
            'contrato_id'       => $contrato->id,
            'fecha_movimiento'  => now(),
            'actuacion'         => $actuacion,
            'observaciones'     => $observacion,
        ]);
    }


}
