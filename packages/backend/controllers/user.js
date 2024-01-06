const RegisterSchema = require("../models/register");
const UserSchema = require("../models/user");
const CustomAPIError = require("../error/custom-error");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const profilepic = {
    contentType: req.file.mimetype,
    originalname: req.file.originalname,
    filename: req.file.filename
  }
  const a = {
    profilepic
  }
  console.log({ ...req.body, ...profilepic })
  const user = await RegisterSchema.create({ ...req.body, ...a });
  const token = user.createJWT();

  res.status(200).json({ token, userName: user.name });
}

const login = async (req, res) => {
  const { email = "", password = "" } = req.body;
  const user = await RegisterSchema.findOne({ email: email });
  if (!user) {
    return res.status(200).json({ "error": "EmailId is not Register" });
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new CustomAPIError("Please Provide correct credentials", 400);
  }

  const token = user.createJWT();
  res.status(200).json({ token, userName: user.name });

}

const createUser = async (req, res) => {
  const user = await UserSchema.create({ ...req.body });
  res.status(200).json({ user });
}

const updateRegisterUser = async (req, res) => {

  const token = req.headers.authorization || "";
  let actualtoken;
  if(token?.includes("Bearer ")){
    actualtoken =  token.split(" ")[1];
  }

  const decoded = jwt.verify(actualtoken, process.env.JWT_SECRET);
  
  const { name, password, email, phone, mobile, zipcode } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (password) updateFields.password = password;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (mobile) updateFields.mobile = mobile;
    if (zipcode) updateFields.zipcode = zipcode;
    if (req.file) updateFields.profilepic = {
      contentType: req.file.mimetype,
      originalname: req.file.originalname, 
      filename: req.file.filename
    }

  const user = await RegisterSchema.findByIdAndUpdate({ _id: decoded.userId }, { $set: {...updateFields} }, { new: true });
  res.status(200).json({ user });
}

const nearestUser = async (req, res) => {
  const { long, lat } = req.body;
  const userLongitude = parseFloat(long);
  const userLatitude = parseFloat(lat);
  console.log(userLongitude, userLatitude);
  // Find the 5 nearest users
  const nearestUsers = await UserSchema.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [userLongitude, userLatitude],
        },
      },
    },
  }).limit(5);

  res.status(200).json({ nearestUsers });
}

module.exports = {
  registerUser,
  login,
  createUser,
  updateRegisterUser,
  nearestUser
}