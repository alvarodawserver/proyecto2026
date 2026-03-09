<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuarios';
    public function contratos()
    {
        return $this->hasMany(Contrato::class);
    }

    public function movimientos(){
        return $this->hasMany(Movimiento::class);
    }

public function roles(){
        return $this->belongsToMany(Role::class);
    }

    public function empleado() {
        // En tu psql dice: "fk_usuarios_empleados" FOREIGN KEY (empleado_id) REFERENCES empleados(id)
        return $this->belongsTo(Empleado::class, 'empleado_id');
    }
}
