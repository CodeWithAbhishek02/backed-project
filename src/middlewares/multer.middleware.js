import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) =>
        cb(null, "./public/temp"),

    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${uuid()}${ext}`;
        cb(null, uniqueName);
    },
});

export const upload = multer({
    storage,
})