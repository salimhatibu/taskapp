<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Ensure2FA
{
    public function handle($request, Closure $next)
    {
        if (Auth::check() && !session('2fa_verified')) {
            return redirect()->route('2fa.send');
        }
        return $next($request);
    }
}
