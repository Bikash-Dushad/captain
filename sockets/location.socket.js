const redis = require("../config/redis");

module.exports = (io) => {
  io.on("connection", (socket) => {
    //stores the updated captains location to redis
    socket.on("LOCATION_UPDATE", async ({ lat, lng }) => {
      const prevLocation = await redis.geopos(
        "captains:online",
        socket.user.id,
      );
      if (
        !prevLocation[0] ||
        prevLocation[0] === null ||
        prevLocation[0][0] !== lng ||
        prevLocation[0][1] !== lat
      ) {
        await redis.geoadd("captains:online", lng, lat, socket.user.id);
        console.log(
          `location added for ${socket.user.id} at ${Date.now()}`,
          lng,
          lat,
        );
      }
    });

    socket.on("disconnect", async () => {
      await redis.zrem("captains:online", socket.user.id);
      console.log("Captain offline");
    });
  });
};
