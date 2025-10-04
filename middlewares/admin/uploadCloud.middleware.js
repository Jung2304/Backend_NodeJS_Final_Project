const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

//! Cloudinary Config
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY, 
  api_secret: process.env.CLOUD_SECRET, 
});

module.exports.upload = async (req, res, next) => {
  if (!req.file) return next();

  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  try {
    const result = await streamUpload(req);
    req.body[req.file.fieldname] = result.secure_url;
    next();
  } catch (err) {
    console.error("❌ Cloudinary upload error:", err.message);
    return res.status(500).send("Upload failed: " + err.message);
  }
};