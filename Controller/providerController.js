const userModel = require("../Model/userModel");
const provider = async (req, res, next) => {
  try {
    const providers = await userModel
      .find({
        role: "provider",
        isAvailable: true,
      })
      .select("-password");
    res.status(200).json({
      success: true,
      data: providers,
    });
  } catch (err) {
    return next(err);
  }
};
module.exports={provider};
