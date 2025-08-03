import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/userSchema.js";

// Load environment variables
dotenv.config({ path: ".env" });

// Admin data
const admin = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@hospital.com",
  phone: "03001234560",
  nic: "1234567890100",
  dob: new Date("1980-01-01"),
  gender: "Male",
  password: "admin123",
  role: "Admin",
  docAvatar: {
    public_id: "admin_avatar",
    url: "https://res.cloudinary.com/ddosh1myt/image/upload/v1/admin_avatar"
  }
};

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

// Add admin to database
const addAdmin = async () => {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: admin.email });
    if (existingAdmin) {
      console.log("Admin already exists in database!");
      console.log("Email:", admin.email);
      console.log("Password: admin123");
      mongoose.connection.close();
      return;
    }
    
    // Add new admin
    const addedAdmin = await User.create(admin);
    
    console.log("Successfully added admin to the database!");
    console.log("Admin Email:", addedAdmin.email);
    console.log("Admin Password: admin123");
    
    mongoose.connection.close();
    console.log("Database connection closed.");
    
  } catch (error) {
    console.error("Error adding admin:", error);
    mongoose.connection.close();
  }
};

// Run the script
addAdmin(); 