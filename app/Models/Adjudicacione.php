<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adjudicacione extends Model
{
    protected $fillable = ['tipo_procedimiento'];

    public function contratos(){
        return $this->hasMany(Contrato::class);
    }
}
