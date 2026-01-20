const express = require("express");
const CaptainRouter = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const {
  captainRegister,
  captainProfile,
  getCaptainByCaptainId,
  getOnlineCaptains,
} = require("../controllers/captain.controller");

CaptainRouter.post("/captainRegister", authMiddleware, captainRegister);
CaptainRouter.get("/captainProfile", authMiddleware, captainProfile);
CaptainRouter.post(
  "/getCaptainByCaptainId",
  authMiddleware,
  getCaptainByCaptainId,
);

CaptainRouter.get("/getOnlineCaptains", authMiddleware, getOnlineCaptains);

module.exports = CaptainRouter;
