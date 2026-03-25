<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

use function Symfony\Component\Translation\t;

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
        return $this->hasMany(Contrato::class, 'user_id'); // Asegúrate de que la FK en contratos sea user_id o el que corresponda
    }

    public function isAdmin(): bool {
    return $this->nombre === 'admin';
}

public function esCualquierJefe(): bool {
    $rolJefeId = DB::table('per_roles')->where('per_roles_nombre', 'Jefe de servicio')->value('per_roles_id');

    return DB::table('per_distribucion')
        ->where('per_distribucion_empleado', $this->empleado_id)
        ->where('per_distribucion_rol', $rolJefeId)
        ->where('per_distribucion_dpto_principal', 1)
        ->exists();
}

public function esJefeContratacion(): bool
    {
        $rolJefeId = DB::table('per_roles')
            ->where('per_roles_nombre', 'Jefe de servicio')
            ->value('per_roles_id');

        return DB::table('per_distribucion')
            ->join('departamentos', 'per_distribucion.per_distribucion_departamento', '=', 'departamentos.id')
            ->where('per_distribucion_empleado', $this->empleado_id)
            ->where('per_distribucion_rol', $rolJefeId)
            ->where('per_distribucion_dpto_principal', true)
            ->where('departamentos.nombre', 'LIKE', '%CONTRATACION%')
            ->exists();

}

}
