const redis = require("../config/redis");

module.exports = (io) => {
  io.on("Connection", (socket) => {
    console.log("Socket connected:", socket.user.authId);

    socket.on("LOCATION_UPDATE", async ({ lat, lng }) => {
      await redis.geoadd(
        "captains:online",
        lng,
        lat,
        socket.user.authId
      );
    });

    socket.on("disconnect", async () => {
      await redis.zrem("captains:online", socket.user.authId);
      console.log("Captain offline");
    });
  });
};
