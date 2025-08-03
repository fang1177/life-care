import mongoose from "mongoose";
import { config } from "dotenv";

// Load environment variables
config({ path: ".env" });

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Check doctors in database
const checkDoctors = async () => {
  try {
    await connectDB();
    
    // Get all users
    const User = mongoose.model('User', new mongoose.Schema({}));
    const allUsers = await User.find({});
    
    console.log(`Found ${allUsers.length} total users`);
    
    const doctors = allUsers.filter(user => user.role === "Doctor");
    console.log(`Found ${doctors.length} doctors`);
    
    for (const doctor of doctors) {
      console.log(`\nDoctor: ${doctor.firstName} ${doctor.lastName}`);
      console.log(`Email: ${doctor.email}`);
      console.log(`Role: ${doctor.role}`);
      if (doctor.docAvatar) {
        console.log(`Avatar URL: ${doctor.docAvatar.url}`);
        console.log(`Avatar Public ID: ${doctor.docAvatar.public_id}`);
      } else {
        console.log(`No avatar found`);
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Error checking doctors:", error);
    process.exit(1);
  }
};

checkDoctors(); 