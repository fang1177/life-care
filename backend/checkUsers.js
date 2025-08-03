import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/userSchema.js";

// Load environment variables
dotenv.config({ path: ".env" });

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

// Check all users in database
const checkUsers = async () => {
  try {
    await connectDB();
    
    // Get all users
    const users = await User.find({}).select('-password');
    
    console.log(`\n📊 Total users in database: ${users.length}\n`);
    
    if (users.length === 0) {
      console.log("❌ No users found in database!");
    } else {
      console.log("👥 Users in database:");
      users.forEach((user, index) => {
        console.log(`${index + 1}. ${user.firstName} ${user.lastName}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Department: ${user.doctorDepartment || 'N/A'}`);
        console.log(`   Created: ${user.createdAt}`);
        console.log("---");
      });
    }
    
    // Check specific roles
    const admins = await User.find({ role: "Admin" });
    const doctors = await User.find({ role: "Doctor" });
    const patients = await User.find({ role: "Patient" });
    
    console.log(`\n🔍 Role Summary:`);
    console.log(`   Admins: ${admins.length}`);
    console.log(`   Doctors: ${doctors.length}`);
    console.log(`   Patients: ${patients.length}`);
    
    mongoose.connection.close();
    console.log("\nDatabase connection closed.");
    
  } catch (error) {
    console.error("Error checking users:", error);
    mongoose.connection.close();
  }
};

// Run the script
checkUsers(); 