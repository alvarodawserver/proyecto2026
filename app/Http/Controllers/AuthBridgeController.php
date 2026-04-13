<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB; // IMPORTANTE: Para las consultas de roles
use Illuminate\Http\Request;

class AuthBridgeController extends Controller
{
    public function loginFromYii(Request $request, $id)
    {

        $secretKey = "contratacion_laravel";
        $ts = $request->query('ts');
        $hash = $request->query('hash');
        $destino = $request->query('dest');


        if (!$ts || abs(time() - (int)$ts) > 120) {
            return abort(403, 'El enlace de acceso ha caducado.');
        }


        $expectedHash = md5($id . $secretKey . $ts);
        if ($hash !== $expectedHash) {
            return abort(403, 'Firma de seguridad inválida.');
        }

        $user = User::find($id);

        if (!$user) {
            return redirect('/login')->with('error', 'Usuario no encontrado en el nuevo sistema.');
        }


        Auth::login($user, true);


        $isAdmin = (strtolower($user->nombre) === 'admin');
        $isJefeContratacion = false;

        $rolJefeId = DB::table('per_roles')
            ->where('per_roles_nombre', 'Jefe de servicio')
            ->value('per_roles_id');

        $distribucion = DB::table('per_distribucion')
            ->join('departamentos', 'per_distribucion.per_distribucion_departamento', '=', 'departamentos.id')
            ->where('per_distribucion_empleado', $user->empleado_id)
            ->where('per_distribucion_rol', $rolJefeId)
            ->where('per_distribucion_dpto_principal', 1)
            ->select('departamentos.nombre')
            ->first();

        if ($distribucion && str_contains(strtoupper($distribucion->nombre), 'CONTRATACION')) {
            $isJefeContratacion = true;
        }

        if ($destino === 'mando' && ($isAdmin || $isJefeContratacion)) {
            return redirect('/contratos/control-mando');
        }

        return redirect('/contratos');
    }
}
