<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movimiento extends Model
{
    protected $fillable = ['usuario_id','fecha_movimiento','contrato_id','observaciones','actuacion'];


    protected $casts = [
        'fecha_movimiento' => 'datetime:d/m/Y H:i',
    ];

    public function usuario(){
        return $this->belongsTo(Usuario::class);
    }

    public function contrato(){
        return $this->belongsTo(Contrato::class);
    }
}
