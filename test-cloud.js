require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

cloudinary.api.ping()
  .then(res => console.log("✅ Works:", res))
  .catch(err => console.error("❌ Error:", err));
