<?php

namespace App\Http\Controllers;

use App\Models\UserOtp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class TwoFactorController extends Controller
{
    public function sendOtp()
    {
        $user = Auth::user();

        // Generate OTP
        $otp = rand(100000, 999999);

        // Save OTP in DB
        UserOtp::create([
            'user_id' => $user->id,
            'otp' => $otp,
            'expires_at' => Carbon::now()->addMinutes(5),
        ]);

        // Send via email
        Mail::raw("Your TaskApp verification code is: $otp", function ($message) use ($user) {
            $message->to($user->email)
                    ->subject("Your TaskApp Verification Code");
        });

        return redirect()->route('2fa.verify')->with('status', 'OTP sent to your email');
    }

    public function verifyOtp(Request $request)
    {
        $request->validate(['otp' => 'required']);

        $record = UserOtp::where('user_id', Auth::id())
            ->where('otp', $request->otp)
            ->where('expires_at', '>', now())
            ->latest()
            ->first();

        if ($record) {
            session(['2fa_verified' => true]);
            return redirect()->route('dashboard')->with('success', '2FA Verified!');
        }

        return back()->withErrors(['otp' => 'Invalid or expired code.']);
    }
}
