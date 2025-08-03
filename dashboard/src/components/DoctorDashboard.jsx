import React, { useContext, useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import axios from "../config/api.js";

const DoctorDashboard = () => {
  const { isAuthenticated, doctor, setIsAuthenticated, setDoctor } = useContext(Context);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (doctor) {
      fetchDoctorAppointments();
    }
  }, [doctor]);

  const fetchDoctorAppointments = async () => {
    try {
      const response = await axios.get(`/api/v1/appointment/doctor/${doctor._id}`);
      setAppointments(response.data.appointments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/v1/user/admin/logout");
      setIsAuthenticated(false);
      setDoctor(null);
      navigateTo("/doctor-login");
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  if (!isAuthenticated || !doctor) {
    return <Navigate to="/doctor-login" />;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Doctor Dashboard</h1>
          <div className="doctor-info">
            <img 
              src={doctor.docAvatar?.url || "/dashboard/docHolder.jpg"} 
              alt="Doctor Avatar" 
              className="doctor-avatar"
            />
            <div>
              <h3>{doctor.firstName} {doctor.lastName}</h3>
              <p>{doctor.doctorDepartment}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Appointments</h3>
            <p>{appointments.length}</p>
          </div>
          <div className="stat-card">
            <h3>Department</h3>
            <p>{doctor.doctorDepartment}</p>
          </div>
          <div className="stat-card">
            <h3>Email</h3>
            <p>{doctor.email}</p>
          </div>
        </div>

        <div className="appointments-section">
          <h2>My Appointments</h2>
          {loading ? (
            <p>Loading appointments...</p>
          ) : appointments.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <div className="appointments-list">
              {appointments.map((appointment) => (
                <div key={appointment._id} className="appointment-card">
                  <div className="appointment-header">
                    <h4>Appointment #{appointment._id.slice(-6)}</h4>
                    <span className={`status ${appointment.status}`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="appointment-details">
                    <p><strong>Patient:</strong> {appointment.patientName}</p>
                    <p><strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {appointment.appointmentTime}</p>
                    <p><strong>Phone:</strong> {appointment.phone}</p>
                    <p><strong>Message:</strong> {appointment.message || "No message"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background-color: #f5f5f5;
        }

        .dashboard-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem 2rem;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        .doctor-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .doctor-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }

        .logout-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .dashboard-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .stat-card h3 {
          color: #666;
          margin-bottom: 0.5rem;
        }

        .stat-card p {
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }

        .appointments-section {
          background: white;
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .appointments-section h2 {
          margin-bottom: 1.5rem;
          color: #333;
        }

        .appointments-list {
          display: grid;
          gap: 1rem;
        }

        .appointment-card {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 1rem;
          background: #fafafa;
        }

        .appointment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .status {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .status.pending {
          background: #fff3cd;
          color: #856404;
        }

        .status.confirmed {
          background: #d4edda;
          color: #155724;
        }

        .status.completed {
          background: #cce5ff;
          color: #004085;
        }

        .appointment-details p {
          margin: 0.25rem 0;
          color: #666;
        }

        .appointment-details strong {
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default DoctorDashboard; 