const userSchema = require("../Schema/userSchema");
const mongoose = require("mongoose");
const model = mongoose.model;
const userModel = new model("user", userSchema);

module.exports = userModel;
