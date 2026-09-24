import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  X,
  Wine,
  Mail,
  Lock,
  User as UserIcon,
  KeyRound,
  RotateCw,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export const AuthModal = ({ isOpen, onClose, initialMode = "login", onToast }) => {
  const { register, verifyOTP, resendOTP, login, forgotPassword, resetPassword } = useAuth();

  const [mode, setMode] = useState(initialMode); // 'login' | 'register' | 'otp-verify' | 'forgot-password' | 'reset-password'
  
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // UI & feedback states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Cooldown timer for Resend OTP
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    setMode(initialMode);
    setErrorMessage("");
    setSuccessMessage("");
  }, [initialMode, isOpen]);

  // Timer countdown hook
  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  if (!isOpen) return null;

  // Handlers
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const res = await register(name, email, password);
      if (res.success) {
        setSuccessMessage(res.message || "Verification code sent to your email.");
        setCooldown(res.cooldownSeconds || 60);
        setMode("otp-verify");
        if (onToast) onToast("Verification code dispatched to your email", "info");
      } else {
        setErrorMessage(res.message || "Registration failed. Please check inputs.");
      }
    } catch (err) {
      setErrorMessage("Server error during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const res = await verifyOTP(email, otp);
      if (res.success) {
        if (onToast) onToast("Email verified! Welcome to Château Dhariwal.", "success");
        onClose();
      } else {
        setErrorMessage(res.message || "Invalid or expired OTP code.");
      }
    } catch (err) {
      setErrorMessage("Verification error. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async (purpose = "registration") => {
    if (cooldown > 0) return;
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const res = await resendOTP(email, purpose);
      if (res.success) {
        setSuccessMessage(res.message || "A fresh OTP has been sent to your email.");
        setCooldown(res.cooldownSeconds || 60);
        if (onToast) onToast("A fresh OTP has been sent to your email.", "info");
      } else {
        setErrorMessage(res.message || "Failed to resend code.");
        if (res.cooldownRemaining) setCooldown(res.cooldownRemaining);
      }
    } catch (err) {
      setErrorMessage("Failed to resend OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        if (onToast) onToast(res.message || "Signed in successfully!", "success");
        onClose();
      } else if (res.isUnverified) {
        setErrorMessage(res.message || "Please verify your email address with the OTP sent.");
        setCooldown(60);
        setMode("otp-verify");
      } else {
        setErrorMessage(res.message || "Invalid credentials.");
      }
    } catch (err) {
      setErrorMessage("Login error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const res = await forgotPassword(email);
      if (res.success) {
        setSuccessMessage(res.message || "Reset code sent to your email.");
        setCooldown(res.cooldownSeconds || 60);
        setMode("reset-password");
        if (onToast) onToast("Reset code sent to your email.", "info");
      } else {
        setErrorMessage(res.message || "Failed to send reset code.");
      }
    } catch (err) {
      setErrorMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const res = await resetPassword(email, otp, newPassword);
      if (res.success) {
        if (onToast) onToast(res.message, "success");
        setSuccessMessage(res.message);
        setPassword("");
        setOtp("");
        setMode("login");
      } else {
        setErrorMessage(res.message || "Failed to reset password.");
      }
    } catch (err) {
      setErrorMessage("Password reset error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-noir-950/85 backdrop-blur-md animate-fadeIn">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-md luxury-glass rounded-2xl sm:rounded-3xl border border-gold-500/30 shadow-2xl p-4 sm:p-8 max-h-[92vh] overflow-y-auto overflow-x-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-noir-900/60 text-cream-200 hover:text-gold-400 hover:bg-wine-900/60 border border-gold-500/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full border border-gold-400/40 bg-wine-900/60 flex items-center justify-center mx-auto mb-3 shadow-gold-glow">
            <Wine className="w-6 h-6 text-gold-400" />
          </div>
          <h3 className="font-serif text-2xl font-bold gold-text-gradient tracking-wide uppercase">
            Château Dhariwal
          </h3>
          <p className="text-xs font-serif uppercase tracking-[0.2em] text-gold-400/80 mt-0.5">
            Exclusive Connoisseur Cellar
          </p>
        </div>

        {/* Feedback Alerts */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/40 flex items-start space-x-2 text-xs text-red-300 animate-fadeIn">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 flex items-start space-x-2 text-xs text-emerald-300 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 1: LOGIN */}
        {/* ======================================================== */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-serif text-lg font-semibold text-cream-100">
                Welcome Back
              </h4>
              <p className="text-xs text-cream-300/70">
                Enter your credentials to access reserve vintages
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-200/80 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gold-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="connoisseur@estate.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-noir-900/80 border border-gold-500/20 text-cream-100 placeholder-cream-300/40 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs uppercase tracking-wider text-cream-200/80">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage("");
                    setSuccessMessage("");
                    setMode("forgot-password");
                  }}
                  className="text-[11px] text-gold-400/90 hover:text-gold-300 underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-gold-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-noir-900/80 border border-gold-500/20 text-cream-100 placeholder-cream-300/40 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-3 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 mt-2 disabled:opacity-60"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Cellar</span>
                  <ArrowRight className="w-4 h-4 text-noir-950" />
                </>
              )}
            </button>

            <div className="text-center pt-3 border-t border-gold-500/15">
              <p className="text-xs text-cream-300/70">
                Don't have a connoisseur account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage("");
                    setSuccessMessage("");
                    setMode("register");
                  }}
                  className="text-gold-400 font-semibold hover:underline"
                >
                  Register Now
                </button>
              </p>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: REGISTER */}
        {/* ======================================================== */}
        {mode === "register" && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-serif text-lg font-semibold text-cream-100">
                Register Connoisseur Membership
              </h4>
              <p className="text-xs text-cream-300/70">
                An OTP will be dispatched to your email for verification
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-200/80 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-gold-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Lord / Lady Connoisseur"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-noir-900/80 border border-gold-500/20 text-cream-100 placeholder-cream-300/40 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-200/80 mb-1.5">
                Email Address (For OTP Verification)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gold-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="your.email@estate.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-noir-900/80 border border-gold-500/20 text-cream-100 placeholder-cream-300/40 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-200/80 mb-1.5">
                Create Password (Min 6 Characters)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gold-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-noir-900/80 border border-gold-500/20 text-cream-100 placeholder-cream-300/40 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-3 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 mt-2 disabled:opacity-60"
            >
              {loading ? (
                <span>Sending Verification OTP...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-noir-950" />
                  <span>Receive Email OTP</span>
                </>
              )}
            </button>

            <div className="text-center pt-3 border-t border-gold-500/15">
              <p className="text-xs text-cream-300/70">
                Already registered?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage("");
                    setSuccessMessage("");
                    setMode("login");
                  }}
                  className="text-gold-400 font-semibold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* VIEW 3: OTP VERIFY (With Real Countdown & Resend OTP) */}
        {/* ======================================================== */}
        {mode === "otp-verify" && (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-serif text-lg font-semibold text-cream-100">
                Verify Email Address
              </h4>
              <p className="text-xs text-cream-300/70 mt-1">
                Enter the 6-digit code sent to: <br />
                <strong className="text-gold-300 font-medium">{email}</strong>
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-200/80 mb-2 text-center">
                6-Digit Verification Code
              </label>
              <div className="relative max-w-xs mx-auto">
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]*"
                  maxLength={6}
                  required
                  autoFocus
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full text-center text-xl sm:text-2xl font-mono tracking-[0.3em] sm:tracking-[0.5em] py-3 rounded-xl bg-noir-900/90 border-2 border-gold-500/40 text-gold-300 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full btn-gold py-3 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              {loading ? (
                <span>Validating Code...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-noir-950" />
                  <span>Verify & Activate Account</span>
                </>
              )}
            </button>

            {/* Resend OTP Functionality with Live Cooldown */}
            <div className="pt-2 text-center">
              {cooldown > 0 ? (
                <p className="text-xs text-cream-300/60 font-medium">
                  Resend code available in:{" "}
                  <strong className="text-gold-300 font-mono">{cooldown}s</strong>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => handleResendOTP("registration")}
                  disabled={loading}
                  className="text-xs text-gold-400 font-medium hover:underline inline-flex items-center space-x-1"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Resend Verification Code</span>
                </button>
              )}
            </div>

            <div className="text-center pt-3 border-t border-gold-500/15">
              <button
                type="button"
                onClick={() => {
                  setErrorMessage("");
                  setSuccessMessage("");
                  setMode("register");
                }}
                className="text-xs text-cream-300/60 hover:text-cream-100"
              >
                &larr; Change Email Address
              </button>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* VIEW 4: FORGOT PASSWORD (Step 1: Enter Email) */}
        {/* ======================================================== */}
        {mode === "forgot-password" && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-serif text-lg font-semibold text-cream-100">
                Recover Cellar Password
              </h4>
              <p className="text-xs text-cream-300/70">
                Enter your registered email to receive a password reset code
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-200/80 mb-1.5">
                Registered Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gold-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="connoisseur@estate.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-noir-900/80 border border-gold-500/20 text-cream-100 placeholder-cream-300/40 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-3 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 mt-2 disabled:opacity-60"
            >
              {loading ? (
                <span>Sending Reset Code...</span>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-noir-950" />
                  <span>Send Reset OTP</span>
                </>
              )}
            </button>

            <div className="text-center pt-3 border-t border-gold-500/15">
              <button
                type="button"
                onClick={() => {
                  setErrorMessage("");
                  setSuccessMessage("");
                  setMode("login");
                }}
                className="text-xs text-cream-300/70 hover:text-gold-400"
              >
                &larr; Remember your password? Sign In
              </button>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* VIEW 5: RESET PASSWORD (Step 2: Enter OTP & New Password) */}
        {/* ======================================================== */}
        {mode === "reset-password" && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="text-center mb-4">
              <h4 className="font-serif text-lg font-semibold text-cream-100">
                Set New Password
              </h4>
              <p className="text-xs text-cream-300/70">
                Enter the reset code sent to <strong className="text-gold-300">{email}</strong>
              </p>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-200/80 mb-1 text-center">
                Reset OTP Code
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]*"
                maxLength={6}
                required
                autoFocus
                placeholder="• • • • • •"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full text-center text-xl sm:text-2xl font-mono tracking-[0.3em] sm:tracking-[0.4em] py-2.5 rounded-xl bg-noir-900/90 border border-gold-500/30 text-gold-300 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-cream-200/80 mb-1.5">
                New Password (Min 6 Characters)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gold-400/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="New secure password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-noir-900/80 border border-gold-500/20 text-cream-100 placeholder-cream-300/40 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length < 6}
              className="w-full btn-gold py-3 rounded-xl text-xs uppercase tracking-widest font-semibold flex items-center justify-center space-x-2 disabled:opacity-60"
            >
              {loading ? (
                <span>Updating Password...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-noir-950" />
                  <span>Update Password & Log In</span>
                </>
              )}
            </button>

            {/* Resend OTP button */}
            <div className="text-center pt-2">
              {cooldown > 0 ? (
                <p className="text-xs text-cream-300/60 font-medium">
                  Resend code in:{" "}
                  <strong className="text-gold-300 font-mono">{cooldown}s</strong>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => handleResendOTP("forgot_password")}
                  disabled={loading}
                  className="text-xs text-gold-400 font-medium hover:underline inline-flex items-center space-x-1"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Resend Reset Code</span>
                </button>
              )}
            </div>

            <div className="text-center pt-3 border-t border-gold-500/15">
              <button
                type="button"
                onClick={() => {
                  setErrorMessage("");
                  setSuccessMessage("");
                  setMode("login");
                }}
                className="text-xs text-cream-300/60 hover:text-cream-100"
              >
                &larr; Back to Login
              </button>
            </div>
          </form>
        )}

      </div>

    </div>
  );
};
