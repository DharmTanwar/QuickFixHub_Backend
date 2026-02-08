const userModel = require("../Model/userModel");
const genrateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const userValidator = require("../Validation/userValidation");
exports.signup = async (req, res, next) => {
  try {
    const { error, value } = userValidator.validate(req.body);
    if (error) {
      const err = new Error(error.details[0].message);
      err.status = 400;
      return next(err);
    } 
    const {
      name,
      email,
      password,
      role,
      phone, 
      service,
      isAvailable,
      createdAt,
    } = req.body;
    const user = new userModel({
      name: name,
      email: email,
      password: password,
      role: role,
      phone: phone,
      service: service,
      isAvailable: isAvailable,
      createdAt: createdAt,
    });

    await user.save();
    const token = genrateToken(user._id);
    res.status(200).json({
      success: true,
      message: "user is created",
      token: token,
    });
  } catch (err) {
    return next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      const err = new Error("user not found");
      err.status = 400;
      return next(err);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Wrong Password");
      err.status = 400;
      return next(err);
    }
    const token = genrateToken(user._id);
    res.status(200).json({
      success: true,
      message: "login succesfully",
      token: token,
      data: user,
    });
  } catch (err) {
    return next(err);
  }
};
