const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    f_sno: {
        type: Number,
        required: true,
        unique: true
    },
    f_userName: {
        type: String,
        unique: true
    },
    f_Pwd: {
        type: String,
        required: true,
    }
});

const User = new mongoose.model("user", UserSchema);
module.exports = User;