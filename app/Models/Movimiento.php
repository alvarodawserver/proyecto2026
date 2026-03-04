<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movimiento extends Model
{
    protected $fillable = ['user_id','fecha_movimiento','observaciones','actuacion'];


    public function user(){
        return $this->belongsTo(User::class);
    }

    public function contrato(){
        return $this->belongsTo(Contrato::class);
    }
}
