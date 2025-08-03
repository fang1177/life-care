import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "../config/api.js";
import LifeCareLogo from "./LifeCareLogo.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "/api/v1/user/login",
          { email, password, confirmPassword, role: "Admin" },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleGoBack = () => {
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL || (import.meta.env.MODE === "development" ? "http://localhost:5173" : "https://hospital-management-frontend.onrender.com");
    window.location.href = frontendUrl;
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      padding: "0",
      margin: "0",
      backgroundColor: "#f5f5f5"
    }}>
      <button 
        onClick={handleGoBack}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          padding: "6px 10px",
          background: "linear-gradient(140deg, #9083d5, #271776ca)",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "4px",
          zIndex: "10"
        }}
      >
        ← Back
      </button>
      
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
        maxWidth: "900px",
        padding: "5px",
        height: "100%",
        gap: "8px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "8px",
          gap: "10px"
        }}>
          <LifeCareLogo size="medium" />
        </div>
        
        <h2 style={{
          fontSize: "1.2rem",
          fontWeight: "600",
          color: "#333",
          margin: "0",
          textAlign: "center"
        }}>
          WELCOME TO LIFECARE
        </h2>
        
        <p style={{
          fontSize: "0.7rem",
          color: "#666",
          margin: "0 0 8px 0",
          textAlign: "center"
        }}>
          Only Admins Are Allowed To Access These Resources!
        </p>
        
        <form onSubmit={handleLogin} style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          width: "100%",
          maxWidth: "450px",
          margin: "0 auto",
          alignItems: "center"
        }}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "8px 12px",
              fontSize: "13px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              width: "100%",
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.3s ease",
              textAlign: "center"
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "8px 12px",
              fontSize: "13px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              width: "100%",
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.3s ease",
              textAlign: "center"
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              padding: "8px 12px",
              fontSize: "13px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              width: "100%",
              boxSizing: "border-box",
              outline: "none",
              transition: "border-color 0.3s ease",
              textAlign: "center"
            }}
          />
          
          <button 
            type="submit"
            style={{
              padding: "8px 20px",
              fontSize: "13px",
              fontWeight: "600",
              background: "linear-gradient(140deg, #9083d5, #271776ca)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              width: "100%",
              marginTop: "2px",
              transition: "transform 0.2s ease, box-shadow 0.2s ease"
            }}
          >
            Login
          </button>
        </form>
        
        <div style={{
          marginTop: "6px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2px",
          width: "100%"
        }}>
          <p style={{
            fontSize: "0.7rem",
            color: "#666",
            margin: "0",
            textAlign: "center",
            width: "100%"
          }}>
            Not Registered?
          </p>
          <button
            onClick={() => {
              const frontendUrl = import.meta.env.VITE_FRONTEND_URL || (import.meta.env.MODE === "development" ? "http://localhost:5173" : "https://hospital-management-frontend.onrender.com");
              window.location.href = frontendUrl + "/register";
            }}
            style={{
              background: "none",
              border: "none",
              color: "#9083d5",
              fontSize: "0.7rem",
              fontWeight: "600",
              cursor: "pointer",
              textDecoration: "underline",
              padding: "1px 0",
              textAlign: "center"
            }}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
