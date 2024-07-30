const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File filtering
const fileFilter = (req, file, cb) => {
    const filetypes = /jpg|jpeg|png/; 
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(new Error('Only jpg, png, or gif files are allowed'), false);
};

// Multer instance created
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter});

module.exports = upload;
