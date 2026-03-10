<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // <-- ¡No olvides esta importación!

class ForceLogin
{
    public function handle(Request $request, Closure $next)
    {
        // Si no hay ninguna sesión activa...
        if (!Auth::check()) {
            // ...forzamos el login del ID que sacamos antes en Tinker (admin2)
            // Asegúrate de que este ID sea el que te devolvió la tabla 'usuarios'
            Auth::loginUsingId(907);
        }

        return $next($request);
    }
}
