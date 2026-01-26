const CaptainModel = require("../models/captain.schema");
const redis = require("../config/redis");
const { producer } = require("../kafka/producer");
const Topics = require("../kafka/topics");
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

  await producer.send({
    topic: Topics.CAPTAIN_REGISTERED,
    messages: [
      {
        value: JSON.stringify({
          authId,
          captainId: newCaptain._id || captain._id,
          isRegistered: true,
        }),
      },
    ],
  });
  console.log("data sent in kafka")
  return newCaptain;
};

const captainProfileService = async (authId) => {
  if (!authId) {
    throw new Error("Auth Id is required");
  }
  const captain = await CaptainModel.findOne({ authId: authId });
  if (!captain) {
    throw new Error("Captain not found");
  }
  return captain;
};

const getCaptainByCaptainIdService = async (captainId) => {
  if (!captainId) {
    throw new Error("Captain Id is required");
  }
  const captain = await CaptainModel.findById(captainId);
  if (!captain) {
    throw new Error("Captain not found");
  }
  const data = {
    captain,
  };
  return data;
};

const getOnlineCaptainsService = async () => {
  const authIds = await redis.zrange("captains:online", 0, -1);
  const positions = await redis.geopos("captains:online", ...authIds);
  const data = authIds.map((authId, index) => {
    const [lng, lat] = positions[index];
    return {
      authId,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };
  });
  return data;
};

module.exports = {
  captainRegisterService,
  captainProfileService,
  getCaptainByCaptainIdService,
  getOnlineCaptainsService,
};
