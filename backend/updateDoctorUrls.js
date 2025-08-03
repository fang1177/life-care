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

// Update doctor URLs
const updateDoctorUrls = async () => {
  try {
    await connectDB();
    
    // Get all doctors
    const User = mongoose.model('User', new mongoose.Schema({}));
    const doctors = await User.find({ role: "Doctor" });
    
    console.log(`Found ${doctors.length} doctors`);
    
    for (const doctor of doctors) {
      if (doctor.docAvatar && doctor.docAvatar.url) {
        const oldUrl = doctor.docAvatar.url;
        let newUrl = oldUrl;
        
        // Update URLs that start with http://localhost:5174
        if (oldUrl.startsWith('http://localhost:5174')) {
          newUrl = oldUrl.replace('http://localhost:5174', 'http://localhost:4000');
        }
        
        // Update URLs that don't have the dashboard prefix
        if (oldUrl.includes('/doc') && !oldUrl.includes('/dashboard/')) {
          newUrl = oldUrl.replace('/doc', '/dashboard/doc');
        }
        
        if (oldUrl !== newUrl) {
          console.log(`Updating doctor ${doctor.firstName} ${doctor.lastName}:`);
          console.log(`  Old URL: ${oldUrl}`);
          console.log(`  New URL: ${newUrl}`);
          
          await User.findByIdAndUpdate(doctor._id, {
            'docAvatar.url': newUrl
          });
        }
      }
    }
    
    console.log("URL update completed!");
    process.exit(0);
  } catch (error) {
    console.error("Error updating URLs:", error);
    process.exit(1);
  }
};

updateDoctorUrls(); 