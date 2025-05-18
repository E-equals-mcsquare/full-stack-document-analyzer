import multer from "multer";
import path from "path";

// Store files temporarily in /uploads
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (_, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({ storage });
