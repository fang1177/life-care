import mongoose from "mongoose";
import { config } from "dotenv";
import bcrypt from "bcrypt";

// Load environment variables
config({ path: ".env" });

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "HOSPITAL_MANAGEMENT_SYSTEM",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Add test doctor
const addTestDoctor = async () => {
  try {
    await connectDB();
    
    // Create User schema
    const userSchema = new mongoose.Schema({
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      nic: String,
      dob: String,
      gender: String,
      password: String,
      role: String,
      doctorDepartment: String,
      docAvatar: {
        public_id: String,
        url: String
      }
    });
    
    const User = mongoose.model('User', userSchema);
    
    // Check if test doctor already exists
    const existingDoctor = await User.findOne({ email: "test.doctor@hospital.com" });
    if (existingDoctor) {
      console.log("Test doctor already exists");
      process.exit(0);
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash("test123", 10);
    
    // Create test doctor
    const testDoctor = new User({
      firstName: "Dr. Test",
      lastName: "Doctor",
      email: "test.doctor@hospital.com",
      phone: "1234567890",
      nic: "1234567890123",
      dob: "1990-01-01",
      gender: "Male",
      password: hashedPassword,
      role: "Doctor",
      doctorDepartment: "Cardiology",
      docAvatar: {
        public_id: "test_doctor_avatar",
        url: "http://localhost:4000/dashboard/doc1.jpg"
      }
    });
    
    await testDoctor.save();
    console.log("Test doctor added successfully!");
    console.log("Email: test.doctor@hospital.com");
    console.log("Password: test123");
    
    process.exit(0);
  } catch (error) {
    console.error("Error adding test doctor:", error);
    process.exit(1);
  }
};

addTestDoctor(); 