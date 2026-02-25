// server/src/middleware/upload.middleware.mjs

import multer from "multer";
import path from "path";

const storage = multer.diskStorage(
  {
    destination: function (req, file, cb) {
      cb(null, "3_penguin_1_dolphin/server/src/uploads");
    },
  },
  {
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  },
);

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype != "application/pdf") {
      return cb(new Error("Only PDF files allowed"));
    }
    cb(null, true);
  },
});

export default upload;
