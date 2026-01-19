const authMiddleware = require("./auth.middleware");
const locationSocket = require("./location.socket");

module.exports = (io) => {
  io.use(authMiddleware);
  locationSocket(io);
};
