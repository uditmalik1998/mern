const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

var upload = multer({ storage:storage });

const { registerUser, login, createUser, updateRegisterUser, nearestUser } = require("../controllers/user");

router.route("/register").post(upload.single('profilepic'), registerUser);
router.route("/login").post(login);
router.route("/user").post(createUser).patch(upload.single('profilepic'), updateRegisterUser);
router.route("/nearestUser").post(nearestUser);

module.exports = router;