import axios from "../config/api.js";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("/api/v1/user/doctors");
        setDoctors(data.doctors);
        console.log("Fetched doctors:", data.doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setNic(""),
        setDob(""),
        setGender(""),
        setAppointmentDate(""),
        setDepartment(""),
        setDoctorFirstName(""),
        setDoctorLastName(""),
        setHasVisited(""),
        setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "40px 20px"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: "600px"
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#333",
            marginBottom: "30px",
            textAlign: "center"
          }}>
            Appointment
          </h2>
          
          <form onSubmit={handleAppointment} style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
            maxWidth: "500px"
          }}>
            <div style={{
              display: "flex",
              gap: "15px",
              width: "100%"
            }}>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{
                  flex: "1",
                  padding: "15px",
                  fontSize: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  width: "100%"
                }}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{
                  flex: "1",
                  padding: "15px",
                  fontSize: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  width: "100%"
                }}
              />
            </div>
            
            <div style={{
              display: "flex",
              gap: "15px",
              width: "100%"
            }}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  flex: "1",
                  padding: "15px",
                  fontSize: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  width: "100%"
                }}
              />
              <input
                type="number"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  flex: "1",
                  padding: "15px",
                  fontSize: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  width: "100%"
                }}
              />
            </div>
            
            <div style={{
              display: "flex",
              gap: "15px",
              width: "100%"
            }}>
              <input
                type="number"
                placeholder="NIC"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                style={{
                  flex: "1",
                  padding: "15px",
                  fontSize: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  width: "100%"
                }}
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                style={{
                  flex: "1",
                  padding: "15px",
                  fontSize: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  width: "100%"
                }}
              />
            </div>
            
            <div style={{
              display: "flex",
              gap: "15px",
              width: "100%"
            }}>
              <select 
                value={gender} 
                onChange={(e) => setGender(e.target.value)}
                style={{
                  flex: "1",
                  padding: "15px",
                  fontSize: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  width: "100%",
                  backgroundColor: "white"
                }}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="date"
                placeholder="Appointment Date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                style={{
                  flex: "1",
                  padding: "15px",
                  fontSize: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  width: "100%"
                }}
              />
            </div>
            
            <div style={{
              display: "flex",
              gap: "15px",
              width: "100%"
            }}>
              <select
                value={department}
                onChange={(e) => {
                  setDepartment(e.target.value);
                  setDoctorFirstName("");
                  setDoctorLastName("");
                }}
                style={{
                  flex: "1",
                  padding: "15px",
                  fontSize: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  width: "100%",
                  backgroundColor: "white"
                }}
              >
                {departmentsArray.map((depart, index) => {
                  return (
                    <option value={depart} key={index}>
                      {depart}
                    </option>
                  );
                })}
              </select>
              
              <select
                value={JSON.stringify({
                  firstName: doctorFirstName,
                  lastName: doctorLastName,
                })}
                onChange={(e) => {
                  const { firstName, lastName } = JSON.parse(e.target.value);
                  setDoctorFirstName(firstName);
                  setDoctorLastName(lastName);
                }}
                disabled={!department}
                style={{
                  flex: "1",
                  padding: "15px",
                  fontSize: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  width: "100%",
                  backgroundColor: "white",
                  opacity: !department ? 0.6 : 1
                }}
              >
                <option value="">Select Doctor</option>
                {doctors
                  .filter((doctor) => doctor.doctorDepartment === department)
                  .map((doctor, index) => (
                    <option
                      key={index}
                      value={JSON.stringify({
                        firstName: doctor.firstName,
                        lastName: doctor.lastName,
                      })}
                    >
                      {doctor.firstName} {doctor.lastName}
                    </option>
                  ))}
              </select>
            </div>
            
            <textarea
              rows="5"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              style={{
                padding: "15px",
                fontSize: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                width: "100%",
                resize: "vertical",
                minHeight: "100px"
              }}
            />
            
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginBottom: "20px"
              }}
            >
              <p style={{ 
                marginBottom: 0,
                fontSize: "16px",
                color: "#666"
              }}>
                Have you visited before?
              </p>
              <input
                type="checkbox"
                checked={hasVisited}
                onChange={(e) => setHasVisited(e.target.checked)}
                style={{ 
                  width: "20px",
                  height: "20px",
                  cursor: "pointer"
                }}
              />
            </div>
            
            <button 
              style={{ 
                padding: "15px 30px",
                fontSize: "18px",
                fontWeight: "600",
                background: "linear-gradient(140deg, #9083d5, #271776ca)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                width: "100%",
                marginTop: "10px"
              }}
            >
              GET APPOINTMENT
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
