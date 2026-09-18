import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("wine_auth_token") || null);
  const [loading, setLoading] = useState(true);

  // Initialize and check current user
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("wine_auth_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const data = await res.json();
        if (data.success && data.user) {
          setUser(data.user);
          setToken(storedToken);
        } else {
          localStorage.removeItem("wine_auth_token");
          setUser(null);
          setToken(null);
        }
      } catch (err) {
        console.error("Session check error:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Register user (Step 1)
  const register = async (name, email, password) => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    return data;
  };

  // Verify OTP (Step 2)
  const verifyOTP = async (email, otp) => {
    const res = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (data.success && data.token) {
      localStorage.setItem("wine_auth_token", data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  // Resend OTP with cooldown
  const resendOTP = async (email, purpose = "registration") => {
    const res = await fetch("/api/auth/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, purpose }),
    });
    const data = await res.json();
    return data;
  };

  // Login
  const login = async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success && data.token) {
      localStorage.setItem("wine_auth_token", data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  // Forgot Password (Send Reset OTP)
  const forgotPassword = async (email) => {
    const res = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data;
  };

  // Reset Password with OTP
  const resetPassword = async (email, otp, newPassword) => {
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });
    const data = await res.json();
    return data;
  };

  // Logout
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (e) {
      // Ignore network failure on logout
    }
    localStorage.removeItem("wine_auth_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        register,
        verifyOTP,
        resendOTP,
        login,
        forgotPassword,
        resetPassword,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
