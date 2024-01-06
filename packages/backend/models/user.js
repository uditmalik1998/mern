const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: { type: String, minLength: 3, maxLength: 30 },
    password: {
        type: String,
        minlength: 6,
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
        maxLength: 10,
        maxLength: 10
    },
    zipcode: {
        type: Number,
        required: [true, "Please Provide ZipCode"],
        maxLength: 6,
        maxLength: 6
    },
    lat: {
        type: Number,
    },
    long: {
        type: Number
    },
    location: {
        type: { type: String },
        coordinates: [Number], // [longitude, latitude]
    },
    profilepic: { contentType: String, originalname: String, filename: String },
});

UserSchema.index({ location: '2dsphere' });

UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("User", UserSchema);