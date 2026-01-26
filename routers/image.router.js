const express = require("express");
const Image = express.Router();
let multer = require("multer");
const { uploadImage } = require("../controllers/captain.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
Image.post("/upload-image", upload.single("file"), uploadImage);

module.exports = Image;
