require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const RegisterSchema = new mongoose.Schema({
    name: { type: String, minLength: 3, maxLength: 30 },
    password: {
        type: String,
        minlength: 6,
        required: [true, "Please Provide a Password"],
    },
    email: {
        type: String,
        required: [true, "Please Provide a Email"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please Provide a Valid Email"],
        unique: true
    },
    phone: {
        type: Number,
        minLength: 10,
        maxLength: 10
    },
    mobile: {
        type: Number,
        required: [true, "Please Provide a Mobile Number"],
        minLength: 10,
        maxLength: 10
    },
    zipcode: {
        type: Number,
        required: [true, "Please Provide ZipCode"],
        maxLength: 6,
        minLength: 6
    },
    profilepic: { data: Buffer, contentType: String, originalname: String, filename: String },
    address: { type: String }
});

RegisterSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

RegisterSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

RegisterSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });
}

module.exports = mongoose.model("register", RegisterSchema);