const Employee = require('../models/EmployeeModel');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// GET EMPLOYEES
exports.get = async function (req, res) {
    try {
        const employees = await Employee.find({});
        res.status(200).json({ success: true, employees });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// REMOVE EMPLOYEE
exports.remove = async function (req, res) {
    try {
        const f_Id = req.params.f_Id;
        console.log(f_Id)
        // check f_Id exists
        let user = await Employee.findOne({ f_Id })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid request" })
        }

        // remove image
        await fs.unlink(user.f_Image, (err) => {
            if (err) {
                return res.status(400).json({ success: false, message: "Invalid request" })
            }
        });

        // delete employee
        await Employee.deleteOne({ f_Id })
        res.status(200).json({ success: true, f_Id, message: 'Employee deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// ADD EMPLOYEE
exports.add = async function (req, res) {
    try {
        const { name, email, mobile, designation, gender, course } = req.body
        const img = req.file.path;
        const newEmployee = await Employee.create({
            f_Id: uuidv4(),
            f_Image: img,
            f_Name: name,
            f_Email: email,
            f_Mobile: mobile,
            f_Designation: designation,
            f_gender: gender,
            f_Course: course,
        })
        res.status(200).json({ success: true, newEmployee, message: 'Employee added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// EDIT EMPLOYEE
exports.edit = async function (req, res) {
    try {
        const { f_Id, name, email, mobile, designation, gender, course, prevImg } = req.body
        const img = req.file.path;

        // check f_Id exists
        let user = await Employee.findOne({ f_Id })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid request" })
        }

        // remove old image
        await fs.unlink(prevImg, (err) => {
            if (err) {
                return res.status(400).json({ success: false, message: "Invalid request" })
            }
        });

        // update data
        const updatedEmployee = await Employee.findOneAndUpdate(
            { f_Id },
            {
                $set: {
                    f_Image: img,
                    f_Name: name,
                    f_Email: email,
                    f_Mobile: mobile,
                    f_Designation: designation,
                    f_gender: gender,
                    f_Course: course,
                }
            },
            { new: true })
        res.status(200).json({ success: true, updatedEmployee, message: 'Employee updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
