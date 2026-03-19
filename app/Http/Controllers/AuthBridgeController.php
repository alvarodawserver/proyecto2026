<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthBridgeController extends Controller
{
    public function loginFromYii($id)
    {
        // 1. Buscamos al usuario en la tabla 'usuarios' por el ID que viene de Yii
        $user = User::find($id);

        if ($user) {
            // 2. Iniciamos sesión manualmente en Laravel
            Auth::login($user);

            // 3. Redirigimos a tu página de inicio de contratos
            return redirect()->route('control-mando');
        }

        return redirect('/login')->with('error', 'Acceso no autorizado');
    }
}
