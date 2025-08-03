import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            We are a dedicated team of developers focused on 
            transforming the healthcare industry through technology. 
            Our goal is to deliver powerful and reliable solutions that 
            streamline hospital operations and improve patient care experiences 
            across all levels.
          </p>
          <p>We are all in 2025!</p>
          <p>We are working on a MERN STACK PROJECT.</p>
          <p>
            Our Hospital Management System is built to simplify workflows, 
            enhance communication between departments, and securely manage 
            patient records. With real-time data access and role-based dashboards, 
            we aim to make hospital administration smarter, faster, and more efficient 
            than ever before.
          </p>
          <p>We believe that better code leads to better care!</p>
          <p>Coding is fun — especially when it's saving lives!</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
