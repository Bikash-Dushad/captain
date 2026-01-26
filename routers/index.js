const captainRouter = require("./captain.router");
const imageUpload = require("./image.router");

const routes = [
  { path: "/captain", router: captainRouter },
  { path: "/image", router: imageUpload },
];

module.exports = routes;
