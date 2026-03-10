<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // <-- ¡No olvides esta importación!

class ForceLogin
{
    public function handle(Request $request, Closure $next)
{
    if (!Auth::check()) {
        $user = \App\Models\User::find(906);

        if ($user) {
            Auth::login($user);
            // dump("Logueado con éxito como: " . $user->nombre);
        } else {
            // dd("Error: El usuario 906 no existe en la tabla usuarios");
        }
    }

    return $next($request);
}
}
