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
        'id_contrato','n_expediente', 'descripcion', 'responsable',
         'importe_estimado','tipo_procedimiento', 'fecha_prevista','fecha_inicio',
        'unidad_promotora', 'duracion_estimada', 'estado_expediente','importe_final',
         'tipos_id', 'created_by', 'n_resolucion','alerta_vencimiento','avisado','formalizado'
    ];


    protected $casts = [
    'fecha_prevista' => 'date',
    'fecha_inicio' => 'date',
    'alerta_vencimiento' => 'datetime',
    ];


    protected $appends = [
    'fecha_inicio_f',
    'fecha_prevista_f',
    'alerta_vencimiento_f',
    'unidad_promotora_nombre'
    ];

    public function movimientos()
    {
        return $this->hasMany(Movimiento::class);
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class,'created_by');//Importante pasar el nombre de la columna si es diferente a lo predeterminado
    }


    public function tipo_procedimiento(){
        return $this->belongsTo(Adjudicacione::class,'tipo_procedimiento');
    }

    public function tipo()
    {
        return $this->belongsTo(Tipo::class,'tipos_id');
    }

    private function format($date) {
        return $date ? \Carbon\Carbon::parse($date)->format('d/m/Y') : '---';
    }

    public function getFechaInicioFAttribute() { return $this->fecha_inicio?->format('d-m-Y') ?? '---'; }
    public function getFechaPrevistaFAttribute() { return $this->fecha_prevista?->format('d-m-Y') ?? '---'; }
    public function getAlertaVencimientoFAttribute() { return $this->alerta_vencimiento?->format('d/m/Y') ?? '---'; }

    public function getUnidadPromotoraNombreAttribute(){
        return $this->usuario?->empleado?->departamento;
    }



}
