<?php

use App\Http\Controllers\TwoFactorController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

// Authentication routes
Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::post('/login', function (Illuminate\Http\Request $request) {
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return redirect()->route('2fa.send');
    }

    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.',
    ])->onlyInput('email');
})->name('login.post');

Route::post('/logout', function () {
    Auth::logout();
    return redirect('/');
})->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/2fa/send', [TwoFactorController::class, 'sendOtp'])->name('2fa.send');
    Route::get('/2fa/verify', function () {
        return view('auth.2fa-verify');
    })->name('2fa.verify');
    Route::post('/2fa/verify', [TwoFactorController::class, 'verifyOtp'])->name('2fa.check');

    // Protect dashboard with 2FA
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->middleware('2fa')->name('dashboard');
});

// Home route
Route::get('/', function () {
    return redirect()->route('login');
});
