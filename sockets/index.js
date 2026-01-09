const authMiddleware = require("./auth.middleware");
const locationSocket = require("./location.socket");

module.exports = (io) => {
  io.use(authMiddleware);       // 1️⃣ Authenticate socket
  locationSocket(io);           // 2️⃣ Attach events
};
