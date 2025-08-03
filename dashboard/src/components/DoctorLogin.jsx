import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "../config/api.js";
import LifeCareLogo from "./LifeCareLogo.jsx";

const DoctorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, setDoctor } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "/api/v1/user/login",
          { email, password, confirmPassword, role: "Doctor" },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          console.log("Doctor login successful:", res.data);
          toast.success(res.data.message);
          setIsAuthenticated(true);
          setDoctor(res.data.user);
          navigateTo("/doctor-dashboard");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
    } catch (error) {
      console.error("Doctor login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const handleGoBackToHome = () => {
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL || (import.meta.env.MODE === "development" ? "http://localhost:5173" : "https://hospital-management-frontend.onrender.com");
    window.location.href = frontendUrl;
  };

  if (isAuthenticated) {
    return <Navigate to={"/doctor-dashboard"} />;
  }

  return (
    <>
      <section className="container form-component">
        <div className="background-pattern"></div>
        
        <div className="login-card">
                     <div className="logo-section">
                     <LifeCareLogo size="medium" />
        <h1 className="form-title">WELCOME TO LIFECARE</h1>
             <p className="subtitle">Doctor Login Portal</p>
           </div>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="login-button">
              <span>👨‍⚕️ Login as Doctor</span>
            </button>
          </form>
          
          <div className="navigation-section">
            <button 
              type="button" 
              onClick={() => navigateTo("/")}
              className="back-btn"
            >
              ← Back to Login Choice
            </button>
            
            <button 
              type="button" 
              onClick={handleGoBackToHome}
              className="home-btn"
            >
              🏠 Go Back to Home
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
          padding: 0.3rem;
          position: relative;
          overflow: hidden;
        }

        .background-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .login-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 1.5rem;
          border-radius: 15px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
          position: relative;
          z-index: 1;
          height: 75vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .logo-section {
          text-align: center;
          margin-bottom: 0.2rem;
        }

        .logo {
          width: 80px;
          height: 80px;
          margin-bottom: 0.2rem;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
          object-fit: contain;
          max-width: 100%;
        }

        .form-title {
          color: #2c3e50;
          margin-bottom: 0.1rem;
          font-size: 1.1rem;
          font-weight: 700;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .subtitle {
          color: #7f8c8d;
          font-size: 0.7rem;
          margin: 0;
          font-weight: 500;
        }

        .login-form {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.3rem;
          margin: 0.1rem 0;
          min-height: 0;
        }

        .input-group {
          width: 100%;
        }

        .input-group label {
          display: block;
          margin-bottom: 0.1rem;
          color: #34495e;
          font-weight: 600;
          font-size: 0.7rem;
        }

        .input-group input {
          width: 100%;
          padding: 0.4rem;
          border: 2px solid #ecf0f1;
          border-radius: 8px;
          font-size: 0.75rem;
          transition: all 0.3s ease;
          background: #f8f9fa;
        }

        .input-group input:focus {
          outline: none;
          border-color: #f093fb;
          background: white;
          box-shadow: 0 0 0 3px rgba(240, 147, 251, 0.1);
        }

        .login-button {
          width: 100%;
          padding: 0.4rem;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(240, 147, 251, 0.3);
          margin-top: 0.2rem;
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(240, 147, 251, 0.4);
        }

        .navigation-section {
          display: flex;
          gap: 0.3rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: auto;
          padding-top: 0.2rem;
          border-top: 1px solid #ecf0f1;
        }

        .back-btn, .home-btn {
          padding: 0.25rem 0.5rem;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.6rem;
          font-weight: 500;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.2rem;
        }

        .back-btn {
          background: #95a5a6;
          color: white;
        }

        .home-btn {
          background: #3498db;
          color: white;
        }

        .back-btn:hover, .home-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        }

        .back-btn:hover {
          background: #7f8c8d;
        }

        .home-btn:hover {
          background: #2980b9;
        }

        @media (max-width: 768px) {
          .login-card {
            padding: 0.8rem;
            margin: 0.3rem;
            height: 80vh;
          }

          .form-title {
            font-size: 1rem;
          }

          .logo {
            width: 70px;
            height: 70px;
          }

          .login-form {
            gap: 0.25rem;
            margin: 0.1rem 0;
          }

          .input-group label {
            font-size: 0.65rem;
          }

          .input-group input {
            padding: 0.35rem;
            font-size: 0.7rem;
          }

          .login-button {
            padding: 0.35rem;
            font-size: 0.7rem;
          }

          .navigation-section {
            flex-direction: column;
            align-items: center;
            gap: 0.15rem;
          }

          .back-btn, .home-btn {
            width: 100%;
            justify-content: center;
            font-size: 0.55rem;
          }
        }
      `}</style>
    </>
  );
};

export default DoctorLogin; 