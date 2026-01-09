const express = require("express");
const CaptainRouter = express.Router();

const { authMiddleware } = require("../middleware/authMiddleware");
const { captainRegister } = require("../controllers/captain.controller");

CaptainRouter.post("/captainRegister", authMiddleware, captainRegister);

module.exports = CaptainRouter;
