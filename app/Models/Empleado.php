<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    protected $table = 'empleados';
    protected $fillable = ['nombre','dni','departamento'];
    public $timestamps = false;

    public function per_distribuciones()
    {
        return $this->hasMany(Per_distribucion::class, 'per_distribucion_empleado');
    }
}
