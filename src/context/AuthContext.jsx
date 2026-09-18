import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL || "";

async function safeApiCall(url, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${url}`, options);
    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return await res.json();
    }
    return {
      success: false,
      message: `Server returned status ${res.status}. Ensure backend server is active.`,
    };
  } catch (err) {
    return {
      success: false,
      message: "Unable to reach server. Please ensure backend is running or configured.",
    };
  }
}

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
        const data = await safeApiCall("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

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
    return await safeApiCall("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
  };

  // Verify OTP (Step 2)
  const verifyOTP = async (email, otp) => {
    const data = await safeApiCall("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    if (data.success && data.token) {
      localStorage.setItem("wine_auth_token", data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  // Resend OTP with cooldown
  const resendOTP = async (email, purpose = "registration") => {
    return await safeApiCall("/api/auth/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, purpose }),
    });
  };

  // Login
  const login = async (email, password) => {
    const data = await safeApiCall("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (data.success && data.token) {
      localStorage.setItem("wine_auth_token", data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  // Forgot Password (Send Reset OTP)
  const forgotPassword = async (email) => {
    return await safeApiCall("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
  };

  // Reset Password with OTP
  const resetPassword = async (email, otp, newPassword) => {
    return await safeApiCall("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });
  };

  // Logout
  const logout = async () => {
    try {
      await safeApiCall("/api/auth/logout", { method: "POST" });
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
