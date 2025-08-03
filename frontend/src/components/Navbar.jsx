import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "../config/api.js";
import { toast } from "react-toastify";
import { Context } from "../main";
import LifeCareLogo from "./LifeCareLogo.jsx";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await axios
              .get("/api/v1/user/patient/logout")
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  // Get dashboard URL based on environment
  const getDashboardUrl = () => {
    return import.meta.env.VITE_DASHBOARD_URL || (import.meta.env.MODE === "development"
      ? "http://localhost:5175"
      : "https://hospital-management-dashboard.onrender.com");
  };

  return (
    <>
      <nav className={"navbar-container"}>
        <div className="navbar-left">
          <div className="logo">
            <LifeCareLogo size="small" />
          </div>
          <div className="nav-links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              About Us
            </Link>
          </div>
        </div>
        <div className="navbar-right">
          <a 
            href={getDashboardUrl()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="adminBtn"
          >
            ADMIN DASHBOARD
          </a>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
