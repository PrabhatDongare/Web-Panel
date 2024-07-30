const express = require('express');
const router = express.Router();

const userRoute = require('./userRoute');
const employeeRoute = require('./employeeRoute');

router.use('/api/user', userRoute);
router.use('/api/employee', employeeRoute);

module.exports = router;