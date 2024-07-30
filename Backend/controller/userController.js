const User = require('../models/UserModel');
const { validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// SIGNUP USER
exports.signUp = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    let success = false
    try {
        const { userName, password } = req.body
        // Check User Name exists
        let user = await User.findOne({ f_userName: userName })
        if (user) {
            return res.status(400).json({ success, message: "Invalid login details" })
        }
        // Generate Password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        // Giving serial number to new entry
        let count = await User.countDocuments({});
        let f_sno = count + 1;

        user = await User.create({ f_sno, f_userName: userName, f_Pwd: hashPassword })
        return res.status(200).json({ success: true, message: "User is created" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
};

// LOGIN USER
exports.login = async function (req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    let success = false
    try {
        const { userName, password } = req.body
        // Check User Name exists
        let user = await User.findOne({ f_userName: userName })
        if (!user) {
            return res.status(400).json({ success, message: "Invalid login details" })
        }
        
        // Check Password
        const checkPass = await bcrypt.compare(password, user.f_Pwd)
        if (!checkPass) {
            return res.status(400).json({ success, message: "Invalid login details" })
        }
        
        // Auth Token given
        const data = { "user": { "f_sno": user.f_sno } }
        const authToken = jwt.sign(data, process.env.JWT_SECRET)
        return res.status(200).json({ success: true, authToken, userName })

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
};
