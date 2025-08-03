import mongoose from "mongoose";

export const dbConnection = () => {
  const connectDB = async () => {
    try {
      console.log("Attempting to connect to MongoDB...");
      console.log("MongoDB URI:", process.env.MONGO_URI ? "Set" : "Not set");
      
      // Use a simpler connection approach without complex SSL options
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        dbName: "HOSPITAL_MANAGEMENT_SYSTEM",
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
        serverApi: {
          version: '1',
          strict: true,
          deprecationErrors: true,
        }
      });
      
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      console.log(`Database: ${conn.connection.name}`);
    } catch (error) {
      console.error("❌ Database connection error:", error.message);
      
      if (error.message.includes("whitelist")) {
        console.error("🔒 IP Whitelist Issue: Please add 0.0.0.0/0 to MongoDB Atlas IP whitelist");
        console.error("📝 Go to: MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere");
      }
      
      if (error.message.includes("authentication")) {
        console.error("🔑 Authentication Issue: Check username/password in MONGO_URI");
      }
      
      if (error.message.includes("SSL")) {
        console.error("🔐 SSL Issue: Check connection string format");
        console.error("💡 Try updating MONGO_URI to: mongodb+srv://HOSPITAL:HOSPITAL@cluster0.zi949pc.mongodb.net/HOSPITAL_MANAGEMENT_SYSTEM?retryWrites=true&w=majority");
      }
      
      // Retry connection after 15 seconds
      console.log("🔄 Retrying connection in 15 seconds...");
      setTimeout(connectDB, 15000);
    }
  };

  connectDB();

  // Handle connection events
  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('🔌 MongoDB disconnected - attempting to reconnect...');
    setTimeout(connectDB, 5000);
  });

  mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB connected successfully');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('🔄 MongoDB reconnected');
  });
};
