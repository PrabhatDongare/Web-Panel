const express = require('express');
const router = express.Router();

const { get, add, remove, edit } = require('../controller/employeeController');
const fetchuser = require('../middleware/fetchuser');
const { employeeDataValidator } = require('../utils/validation');
const upload = require('../middleware/multerConfig');

router.post("/get", fetchuser, get);
router.delete("/delete/:f_Id", fetchuser, remove);
router.post("/add", fetchuser, employeeDataValidator, upload.single('img'), add);
router.put("/edit", fetchuser, employeeDataValidator, upload.single('img'), edit);

module.exports = router
