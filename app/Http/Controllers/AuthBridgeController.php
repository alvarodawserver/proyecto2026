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


        $user = User::find($id);

        if ($user) {
            Auth::login($user);

            $isAdmin = ($user->nombre === 'admin');


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
            if ($isAdmin || $isJefeContratacion) {
                return redirect('/contratos/control-mando');
                }

                dd(['Nombre' => $user->nombre, 'isAdmin' => $isAdmin, 'Depto' => $distribucion->nombre ?? 'N/A', 'isJefe' => $isJefeContratacion]);
            return redirect('contratos');
        }

        return redirect('/login')->with('error', 'Acceso no autorizado');
    }
}
