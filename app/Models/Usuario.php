<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    public $timestamps = false;


    public function contratos()
    {
        return $this->hasMany(Contrato::class);
    }

    public function movimientos(){
        return $this->hasMany(Movimiento::class);
    }

    public function empleado(){
        return $this->belongsTo(Empleado::class,'empleado_id');
    }
}
