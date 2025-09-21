@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Two-Factor Authentication</h2>
    <p>Please enter the 6-digit code sent to your email.</p>

    @if(session('status'))
        <div style="color: green;">{{ session('status') }}</div>
    @endif

    <form method="POST" action="{{ route('2fa.check') }}">
        @csrf
        <input type="text" name="otp" maxlength="6" required placeholder="Enter OTP">
        @error('otp') <div style="color: red;">{{ $message }}</div> @enderror
        <button type="submit">Verify</button>
    </form>
</div>
@endsection
