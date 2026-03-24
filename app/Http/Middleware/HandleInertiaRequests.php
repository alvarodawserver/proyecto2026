<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Illuminate\Support\Facades\DB;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
{
   $usuario = $request->user();
    $isJefeContratacion = false;
    $isAdmin = false;
    $departamento = null;

    if ($usuario) {
        if ($usuario->nombre === 'admin') {
            $isAdmin = true;
        }

        $rolJefeId = DB::table('per_roles')
            ->where('per_roles_nombre', 'Jefe de servicio')
            ->value('per_roles_id');

        $distribucion = DB::table('per_distribucion')
            ->join('departamentos', 'per_distribucion.per_distribucion_departamento', '=', 'departamentos.id')
            ->where('per_distribucion_empleado', $usuario->empleado_id)
            ->where('per_distribucion_rol', $rolJefeId)
            ->where('per_distribucion_dpto_principal', 1)
            ->select('departamentos.nombre')
            ->first();

        if ($distribucion) {
            $departamento = $distribucion->nombre;
            if (str_contains(strtoupper($departamento), 'CONTRATACION')) {
                $isJefeContratacion = true;
            }
        }
        $puedeAccederControlMando = $isAdmin || $isJefeContratacion;
    }

    return [
        ...parent::share($request),
        'auth' => [
            'user' => $usuario ? [
                'id' => $usuario->id,
                'nombre' => $usuario->nombre,
                'name'   => $usuario->nombre,
                'email' => $usuario->email,
                'empleado_id' => $usuario->empleado_id,
                'departamento' => $departamento,
            ] : null,
            'can' => [
                'manejar_contratos' => $puedeAccederControlMando,
                'manejar_procedimientos' => $puedeAccederControlMando,
                'manejar_tipos' => $puedeAccederControlMando,
                'ver_historico' => $puedeAccederControlMando,
                'ver_control_mando' => ($isAdmin || $isJefeContratacion),
            ],
        ],
    ];
}
}
