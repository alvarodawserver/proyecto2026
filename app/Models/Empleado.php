<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    protected $table = 'empleados';

    // ESTA ES LA LÍNEA QUE TE FALTA
    public $timestamps = false;

    protected $fillable = [
        'dni', 'nombre', 'sexo', 'fechanac', 'estadocivil',
        'direccion', 'codpostal', 'relacionjuridica',
        'cargo', 'departamento', 'empresa_id', 'alta'
    ];
    public function departamento()
    {
        return $this->belongsTo(Departamento::class, 'departamento_id');
    }
}
