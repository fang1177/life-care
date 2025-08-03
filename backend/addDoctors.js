import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/userSchema.js";

// Load environment variables
dotenv.config({ path: ".env" });

// Sample doctors data
const doctors = [
  {
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@hospital.com",
    phone: "03001234567",
    nic: "1234567890123",
    dob: new Date("1985-03-15"),
    gender: "Female",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Cardiology",
    docAvatar: {
      public_id: "sample_avatar_1",
      url: "https://res.cloudinary.com/ddosh1myt/image/upload/v1/sample_avatar_1"
    }
  },
  {
    firstName: "Dr. Michael",
    lastName: "Chen",
    email: "michael.chen@hospital.com",
    phone: "03001234568",
    nic: "1234567890124",
    dob: new Date("1980-07-22"),
    gender: "Male",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Neurology",
    docAvatar: {
      public_id: "sample_avatar_2",
      url: "https://res.cloudinary.com/ddosh1myt/image/upload/v1/sample_avatar_2"
    }
  },
  {
    firstName: "Dr. Emily",
    lastName: "Rodriguez",
    email: "emily.rodriguez@hospital.com",
    phone: "03001234569",
    nic: "1234567890125",
    dob: new Date("1988-11-08"),
    gender: "Female",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Pediatrics",
    docAvatar: {
      public_id: "sample_avatar_3",
      url: "https://res.cloudinary.com/ddosh1myt/image/upload/v1/sample_avatar_3"
    }
  },
  {
    firstName: "Dr. James",
    lastName: "Wilson",
    email: "james.wilson@hospital.com",
    phone: "03001234570",
    nic: "1234567890126",
    dob: new Date("1975-12-03"),
    gender: "Male",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Orthopedics",
    docAvatar: {
      public_id: "sample_avatar_4",
      url: "https://res.cloudinary.com/ddosh1myt/image/upload/v1/sample_avatar_4"
    }
  },
  {
    firstName: "Dr. Lisa",
    lastName: "Thompson",
    email: "lisa.thompson@hospital.com",
    phone: "03001234571",
    nic: "1234567890127",
    dob: new Date("1982-05-18"),
    gender: "Female",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Dermatology",
    docAvatar: {
      public_id: "sample_avatar_5",
      url: "https://res.cloudinary.com/ddosh1myt/image/upload/v1/sample_avatar_5"
    }
  },
  {
    firstName: "Dr. David",
    lastName: "Brown",
    email: "david.brown@hospital.com",
    phone: "03001234572",
    nic: "1234567890128",
    dob: new Date("1978-09-25"),
    gender: "Male",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Oncology",
    docAvatar: {
      public_id: "sample_avatar_6",
      url: "https://res.cloudinary.com/ddosh1myt/image/upload/v1/sample_avatar_6"
    }
  },
  {
    firstName: "Dr. Maria",
    lastName: "Garcia",
    email: "maria.garcia@hospital.com",
    phone: "03001234573",
    nic: "1234567890129",
    dob: new Date("1987-01-14"),
    gender: "Female",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "ENT",
    docAvatar: {
      public_id: "sample_avatar_7",
      url: "https://res.cloudinary.com/ddosh1myt/image/upload/v1/sample_avatar_7"
    }
  },
  {
    firstName: "Dr. Robert",
    lastName: "Taylor",
    email: "robert.taylor@hospital.com",
    phone: "03001234574",
    nic: "1234567890130",
    dob: new Date("1983-06-30"),
    gender: "Male",
    password: "doctor123",
    role: "Doctor",
    doctorDepartment: "Radiology",
    docAvatar: {
      public_id: "sample_avatar_8",
      url: "https://res.cloudinary.com/ddosh1myt/image/upload/v1/sample_avatar_8"
    }
  }
];

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "HOSPITAL_MANAGEMENT_SYSTEM",
    });
    console.log("Connected to database!");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

// Add doctors to database
const addDoctors = async () => {
  try {
    await connectDB();
    
    // Clear existing doctors (optional - comment out if you want to keep existing data)
    // await User.deleteMany({ role: "Doctor" });
    
    // Add new doctors
    const addedDoctors = await User.insertMany(doctors);
    
    console.log(`Successfully added ${addedDoctors.length} doctors to the database!`);
    
    // Display added doctors
    addedDoctors.forEach((doctor, index) => {
      console.log(`${index + 1}. Dr. ${doctor.firstName} ${doctor.lastName} - ${doctor.doctorDepartment}`);
    });
    
    mongoose.connection.close();
    console.log("Database connection closed.");
    
  } catch (error) {
    console.error("Error adding doctors:", error);
    mongoose.connection.close();
  }
};

// Run the script
addDoctors(); 