<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Departamento extends Model
{
    protected $table = 'departamentos';
    protected $fillable = ['nombre','mostrar','calendario_dias_naturales','organica','mostrar_rrhh'];
}
