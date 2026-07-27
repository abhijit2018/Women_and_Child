const multer = require("multer");

// Memory storage
const storage = multer.memoryStorage();

// File filter (optional)
const fileFilter = (req, file, cb) => {
  cb(null, true); // Accept all files
};

// Limits
const limits = {
  fileSize: 20 * 1024 * 1024, // 20MB per file
};

const upload = multer({ storage, fileFilter, limits });

// Export pre-configured middlewares
module.exports = {
  uploadFields: upload.fields([
    { name: "profile_image", maxCount: 10 },
    { name: "signature", maxCount: 10 },
    { name: "upload_document", maxCount: 10 },
    { name: "upload_report", maxCount: 10 }
  ]),
  uploadAny: upload.any(), // Accept any file
  uploadArray: (fieldName, maxCount) => upload.array(fieldName, maxCount),
};
