const { captainRegisterService } = require("../services/captain.service");
const { handleError } = require("../utils/error.handler");

const captainRegister = async (req, res) => {
  try {
    const authId = req.user.id;
    const phone = req.user.phone;
    const payload = req.body;
    payload.authId = authId;
    payload.phone = phone;
    const data = await captainRegisterService(payload);
    return res.status(200).json({
      responseCode: 200,
      message: "captain registered successfully",
      data,
    });
  } catch (error) {
    return handleError(res, error, "captainRegister");
  }
};

module.exports = {
  captainRegister,
};
