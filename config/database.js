const mongoose = require("mongoose");

module.exports.connect = async () => {        // export hàm connect
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect to database successful!");
  } catch (error) {
    console.log("Error:", error);
  }
}

