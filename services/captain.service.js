const CaptainModel = require("../models/captain.schema");
const redis = require("../config/redis");
const {
  captainRegisterValidation,
} = require("../validators/captain.validator");

const captainRegisterService = async (payload) => {
  const {
    authId,
    name,
    email,
    phone,
    gender,
    avatar,
    license,
    bankDetails,
    documents,
  } = payload;
  const { error } = captainRegisterValidation.validate(payload);
  if (error) {
    throw new Error(error.details[0].message);
  }
  const captain = await CaptainModel.findOne({
    authId,
    isActive: true,
    isDeleted: false,
  });
  if (captain) {
    captain.name = name;
    captain.gender = gender;
    captain.avatar = avatar;
    captain.license = license;
    captain.bankDetails = bankDetails;
    captain.documents = documents;
    captain.isRegistered = true;
    await captain.save();
    return captain;
  }
  const newCaptain = new CaptainModel({
    authId,
    name,
    email,
    phone,
    gender,
    avatar,
    isRegistered: true,
    license,
    bankDetails,
    documents,
  });
  await newCaptain.save();
  return newCaptain;
};

module.exports = {
  captainRegisterService,
};
