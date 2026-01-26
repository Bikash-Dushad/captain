const {
  captainRegisterService,
  captainProfileService,
  getCaptainByCaptainIdService,
  getOnlineCaptainsService,
} = require("../services/captain.service");
const { imageService } = require("../services/image.service");
const { handleError } = require("../utils/error.handler");

const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    const data = await imageService(file);
    return res.status(200).json({
      responseCode: 200,
      message: "File uploaded successfully",
      data,
    });
  } catch (error) {
    return handleError(res, error, "uploadImage");
  }
};

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

const captainProfile = async (req, res) => {
  try {
    const authId = req.user.id;
    const data = await captainProfileService(authId);
    return res.status(200).json({
      responseCode: 200,
      message: "Captain Profile fetched successfully",
      data,
    });
  } catch (error) {
    return handleError(res, error, "captainProfile");
  }
};

const getCaptainByCaptainId = async (req, res) => {
  try {
    const { captainId } = req.body;
    const data = await getCaptainByCaptainIdService(captainId);
    return res.status(200).json({
      responseCode: 200,
      message: "Captain fetched successfully",
      data,
    });
  } catch (error) {
    return handleError(res, error, "getCaptainByCaptainId");
  }
};

const getOnlineCaptains = async (req, res) => {
  try {
    const data = await getOnlineCaptainsService();
    return res.status(200).json({
      responseCode: 200,
      message: "Captains fetched successfully",
      data,
    });
  } catch (error) {
    return handleError(res, error, "getOnlineCaptains");
  }
};

module.exports = {
  uploadImage,
  captainRegister,
  captainProfile,
  getCaptainByCaptainId,
  getOnlineCaptains,
};
