<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;


class Movimiento extends Model
{
    protected $fillable = ['usuario_id','fecha_movimiento','contrato_id','observaciones','actuacion'];


    protected $casts = [
        'fecha_movimiento' => 'datetime',
    ];


    protected $appends = ['fecha_movimiento_f'];
    public function usuario(){
        return $this->belongsTo(Usuario::class);
    }

    public function contrato(){
        return $this->belongsTo(Contrato::class);
    }

    public function getFechaMovimientoFAttribute() {
        if (!$this->fecha_movimiento) {
        return 'Sin definir';
        }
        return $this->fecha_movimiento
        ->timezone('Europe/Madrid')
        ->locale('es')
        ->format('d/m/Y H:i');;

    }
}
