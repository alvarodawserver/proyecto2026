<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    protected $table = 'empleados';
    public function departamento()
    {
        return $this->belongsTo(Departamento::class, 'departamento_id');
    }
}
