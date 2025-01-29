import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.join(__dirname, "uploads");
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        callback(null, uploadDir);
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

export default upload;
