<?php

namespace App\Models;

use Carbon\CarbonInterface;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\SoftDeletes;
class Contrato extends Model
{
    use SoftDeletes;
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


    protected $appends = [
    'fecha_inicio_f',
    'fecha_prevista_f',
    'alerta_vencimiento_f',
    'duracion_estimada_f'
];

    public function movimientos()
    {
        return $this->hasMany(Movimiento::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class,'created_by');//Importante pasar el nombre de la columna si es diferente a lo predeterminado
    }



    private function format($date) {
        return $date ? \Carbon\Carbon::parse($date)->format('d/m/Y') : '---';
    }

    public function getFechaInicioFAttribute() { return $this->format($this->fecha_inicio); }
    public function getFechaPrevistaFAttribute() { return $this->format($this->fecha_prevista); }
    public function getAlertaVencimientoFAttribute() { return $this->format($this->alerta_vencimiento); }
    public function getDuracionEstimadaFAttribute() {
        if (!$this->fecha_inicio || !$this->duracion_estimada) {
        return 'Sin definir';
        }
        return \Carbon\Carbon::parse($this->fecha_inicio)
        ->locale('es') // Forzamos el español
        ->diffForHumans($this->duracion_estimada, [
            'syntax' => CarbonInterface::DIFF_ABSOLUTE,
            'parts' => 2,
        ]);

    }
}
