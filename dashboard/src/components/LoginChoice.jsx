import React from "react";
import { useNavigate } from "react-router-dom";
import LifeCareLogo from "./LifeCareLogo.jsx";

const LoginChoice = () => {
  const navigateTo = useNavigate();

  const handleGoBackToHome = () => {
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL || (import.meta.env.MODE === "development" ? "http://localhost:5173" : "https://hospital-management-frontend.onrender.com");
    window.location.href = frontendUrl;
  };

  return (
    <div className="login-choice-container">
      <div className="background-pattern"></div>
      
      <div className="login-choice-card">
                 <div className="logo-section">
                   <LifeCareLogo size="large" />
        <h1 className="form-title">WELCOME TO LIFECARE</h1>
          <p className="subtitle">Hospital Management System</p>
        </div>
        
        <div className="content-section">
          <h2 className="choose-text">Choose your login type:</h2>
          
          <div className="login-buttons">
            <button 
              onClick={() => navigateTo("/login")}
              className="login-btn admin-btn"
            >
              <div className="btn-icon">👨‍💼</div>
              <div className="btn-content">
                <h3>Admin Login</h3>
                <p>Manage doctors, appointments, and system settings</p>
                <span className="btn-arrow">→</span>
              </div>
            </button>
            
            <button 
              onClick={() => navigateTo("/doctor-login")}
              className="login-btn doctor-btn"
            >
              <div className="btn-icon">👨‍⚕️</div>
              <div className="btn-content">
                <h3>Doctor Login</h3>
                <p>View your appointments and patient information</p>
                <span className="btn-arrow">→</span>
              </div>
            </button>
          </div>
        </div>
        
        <div className="footer-section">
          <button 
            type="button" 
            onClick={handleGoBackToHome}
            className="go-back-btn"
          >
            ← Go Back to Home
          </button>
        </div>
      </div>

      <style jsx>{`
        .login-choice-container {
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

        .login-choice-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 1.5rem 2rem;
          border-radius: 15px;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 800px;
          width: 100%;
          position: relative;
          z-index: 1;
          height: 85vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .logo-section {
          margin-bottom: 0.5rem;
        }

        .form-title {
          color: #2c3e50;
          margin-bottom: 0.1rem;
          font-size: 1.8rem;
          font-weight: 700;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .subtitle {
          color: #7f8c8d;
          font-size: 1rem;
          margin: 0;
          font-weight: 500;
        }

        .content-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.5rem;
          min-height: 0;
        }

        .choose-text {
          color: #34495e;
          margin-bottom: 0.5rem;
          font-size: 1rem;
          font-weight: 600;
        }

        .login-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          max-height: 60%;
          overflow: hidden;
        }

        .login-btn {
          flex: 1;
          min-width: 250px;
          max-width: 320px;
          padding: 1rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          position: relative;
          overflow: hidden;
        }

        .login-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .login-btn:hover::before {
          left: 100%;
        }

        .admin-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
        }

        .doctor-btn {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          box-shadow: 0 6px 20px rgba(240, 147, 251, 0.3);
        }

        .login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .btn-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .btn-content {
          flex: 1;
          text-align: left;
          min-width: 0;
        }

        .btn-content h3 {
          margin: 0 0 0.2rem 0;
          font-size: 1rem;
          font-weight: 600;
        }

        .btn-content p {
          margin: 0;
          font-size: 0.75rem;
          opacity: 0.9;
          line-height: 1.2;
        }

        .btn-arrow {
          position: absolute;
          right: 0.8rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          opacity: 0.7;
          transition: all 0.3s ease;
        }

        .login-btn:hover .btn-arrow {
          opacity: 1;
          transform: translateY(-50%) translateX(3px);
        }

        .footer-section {
          border-top: 1px solid #ecf0f1;
          padding-top: 0.5rem;
          margin-top: auto;
        }

        .go-back-btn {
          background: #95a5a6;
          color: white;
          border: none;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          font-size: 0.7rem;
          font-weight: 500;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        .go-back-btn:hover {
          background: #7f8c8d;
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          .login-choice-card {
            padding: 1rem;
            margin: 0.3rem;
            height: 90vh;
          }

          .form-title {
            font-size: 1.4rem;
          }

          .login-buttons {
            flex-direction: column;
            gap: 0.8rem;
          }

          .login-btn {
            min-width: auto;
            max-width: none;
            padding: 0.8rem;
            gap: 0.6rem;
          }

          .btn-icon {
            font-size: 1.2rem;
          }

          .btn-content h3 {
            font-size: 0.9rem;
          }

          .btn-content p {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginChoice; 