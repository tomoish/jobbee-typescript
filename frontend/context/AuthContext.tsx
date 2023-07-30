import axios from "axios";
import { useState, useEffect, createContext } from "react";

import { useRouter } from "next/router";

// interface AuthContextType {
//   loading: boolean;
//   user: any; // Replace 'any' with the actual user type
//   isAuthenticated: boolean;
//   error: any; // Replace 'any' with the actual error type, if needed
//   login:any;
// }

// Create the AuthContext with the specified type
// const AuthContext = createContext<AuthContextType | null>(null);

const AuthContext = createContext();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, SetIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, [user]);

  // Login user
  const login = async ({ username, password }) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });

      if (res.data.success) {
        loadUser();
        SetIsAuthenticated(true);
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // Register user
  const register = async ({ firstName, lastName, email, password }) => {
    try {
      setLoading(true);

      const res = await axios.post(`${process.env.API_URL}/api/register/`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      if (res.data.message) {
        setLoading(false);
        router.push("/login");
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // Update user
  const updateProfile = async (
    { firstName, lastName, email, password },
    access_token
  ) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${process.env.API_URL}/api/me/update/`,
        {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data) {
        setLoading(false);
        setUpdated(true);
        setUser(res.data);
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // Upload Resume
  const uploadResume = async (formData, access_token) => {
    try {
      setLoading(true);

      const res = await axios.put(
        `${process.env.API_URL}/api/upload/resume/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data) {
        setLoading(false);
        setUploaded(true);
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  const loadUser = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/auth/user");

      if (res.data.user) {
        SetIsAuthenticated(true);
        setLoading(false);
        setUser(res.data.user);
      }
    } catch (error) {
      setLoading(false);
      SetIsAuthenticated(false);
      setUser(null);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // Logout user
  const logout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");

      if (res.data.success) {
        SetIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setLoading(false);
      SetIsAuthenticated(false);
      setUser(null);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

  // Clear Errors
  const clearErrors = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        user,
        error,
        isAuthenticated,
        updated,
        uploaded,
        login,
        register,
        updateProfile,
        logout,
        setUpdated,
        setUploaded,
        uploadResume,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
