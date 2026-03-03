<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    protected $fillable = [
        'n_expediente',
        'descripcion',
        'user_id',
        'tipo_contrato',
        'importe_estimado',
        'proc_adjudicacion',
        'fecha_prevista',
        'fecha_inicio',
        'unidad_promotora',
        'duracion_estimada',
        'estado_expediente'
    ];

    public function movimientos()
    {
        return $this->hasMany(Movimiento::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }


}
