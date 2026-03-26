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



    return [
        ...parent::share($request),
        'auth' => [
            'user' => $usuario ? [
                'id' => $usuario->id,
                'nombre' => $usuario->nombre,
                'name'   => $usuario->nombre,
                'email' => $usuario->email,
                'empleado_id' => $usuario->empleado_id,
                'departamento' => $usuario->empleado->departamento ? $usuario->empleado->departamento : null,
            ] : null,
            'can' => [
                'ver_control_mando' => $usuario ? $usuario->can('ver-control-mando') : false,

            ],
            'urls' => [
                'yii_utilidades_url' => env('YII_URL', 'http://localhost:8080/index.php?r=utilidades%2Findex'),
                'home' => env('YII_HOME_URL','http://localhost:8080/index.php'),
            ],
        ],
    ];
}
}
