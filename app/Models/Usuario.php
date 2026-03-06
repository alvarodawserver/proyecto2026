<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    //


    public function contratos()
    {
        return $this->hasMany(Contrato::class);
    }

    public function movimientos(){
        return $this->hasMany(Movimiento::class);
    }
}
