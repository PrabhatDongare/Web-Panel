const { body } = require('express-validator');

exports.signupValidator = [
    body('userName', 'Invalid input').notEmpty().isLength({ min: 3, max: 30 }),
    body('password', 'Invalid input').notEmpty().isLength({ min: 3 }),
];

exports.loginValidator = [
    body('userName', 'Invalid input').notEmpty().isLength({ min: 3, max: 30 }),
    body('password', 'Invalid input').notEmpty().isLength({ min: 3 }),
];

exports.employeeDataValidator = [
    body('name', 'Invalid input').notEmpty().isLength({ min: 3, max: 30 }),
    body('email', 'Invalid input').notEmpty().isEmail().isLength({ min: 7, max: 50 }),
    body('mobile', 'Invalid input').notEmpty().isLength(10),
    body('designation', 'Invalid input').notEmpty().isLength({ min: 2, max: 20 }),
    body('gender', 'Invalid input').notEmpty().isLength({ min: 4, max: 6 }),
    body('course', 'Invalid input').notEmpty().isLength({ max: 30 }),
    body('img').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Image is required');
        }
        const fileType = req.file.mimetype;
        if (fileType !== 'image/jpg' && fileType !== 'image/jpeg' && fileType !== 'image/png') {
            throw new Error('Only jpg and png files are allowed');
        }
        const fileSizeInKB = req.file.size / 1024;
        if (fileSizeInKB < 10 || fileSizeInKB > 5120) {
            throw new Error('Invalid file size. The file must be between 10KB and 5MB.');
        }
        return true;
    }),
];
