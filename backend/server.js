import app from "./app.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const PORT = process.env.PORT;
if (!PORT) {
  throw new Error('PORT environment variable is required.');
}
const HOST = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Server listening at ${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
