<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'usuarios';
    protected $primaryKey = 'id';
    public $timestamps = false;

    /**
     * IMPORTANTE: Como no tienes la columna 'remember_token' de Laravel,
     * vamos a decirle a Laravel que no intente usarla para evitar errores de SQL.
     */
    public function getRememberTokenName()
    {
        return null; // O si quieres usar 'token', cámbialo por 'token'
    }

    protected $fillable = [
        'nombre',
        'email',
        'password',
        'token',
        'empleado_id',
    ];




    protected $hidden = [
        'password',
        // 'token', // Descomenta esto si no quieres que el token de Yii viaje en los JSON
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    /**
     * Laravel busca la propiedad 'name' por defecto para muchas cosas (como Jetstream/Inertia).
     * Con esto, cuando pidas $user->name, te dará el valor de la columna 'nombre'.
     */
    public function getNameAttribute()
    {
        return $this->nombre;
    }

    // Relaciones
    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'empleado_id');
    }

    public function contratos()
    {
        return $this->hasMany(Contrato::class, 'user_id'); 
    }
}
