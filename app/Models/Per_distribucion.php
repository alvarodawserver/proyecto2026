<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Per_distribucion extends Model
{
    protected $table = 'per_distribucion';

    // ESTA ES LA LÍNEA QUE TE FALTA
    public $timestamps = false;

    protected $fillable = [
        'per_distribucion_empleado', 'per_distribucion_departamento', 'per_distribucion_rol', 'per_distribucion_dpto_principal'
    ];
    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'per_distribucion_empleado');
    }


}
