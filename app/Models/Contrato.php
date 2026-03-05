<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contrato extends Model
{
    protected $fillable = [
        'n_expediente',
        'descripcion',
        'responsable',
        'created_by',
        'tipo_contrato',
        'importe_estimado',
        'proc_adjudicacion',
        'fecha_prevista',
        'fecha_inicio',
        'unidad_promotora',
        'duracion_estimada',
        'estado_expediente',
    ];


    protected $casts = [
    'fecha_prevista' => 'date',
    'fecha_inicio' => 'date',
    'duracion_estimada' => 'date',
    'alerta_vencimiento' => 'datetime',
    ];

    public function movimientos()
    {
        return $this->hasMany(Movimiento::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getTiempoRestanteAttribute() {
        return $this->fecha_inicio->diffForHumans($this->duracion_estimada);

    }

}
