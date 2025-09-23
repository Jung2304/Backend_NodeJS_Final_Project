const multer = require("multer");

module.exports = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {         // cb -> callback function provided by multer
      cb(null, "./public/uploads/")
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, `${uniqueSuffix}-${file.originalname}`);       // lưu tên file dạng này
    },
  });
  return storage;
}