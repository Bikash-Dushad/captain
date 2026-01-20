const redis = require("../config/redis");

module.exports = (io) => {
  io.on("connection", (socket) => {
    //stores the updated captains location to redis
    socket.on("LOCATION_UPDATE", async ({ lat, lng }) => {
      await redis.geoadd("captains:online", lng, lat, socket.user.id);
      console.log("location added", lng, lat)
    });

    //sends the captains location user
    socket.on("USER_LOCATION", async ({ lat, lng }) => {
      try {
        const captains = await redis.georadius(
          "captains:online",
          lng,
          lat,
          5,
          "km",
          "WITHCOORD",
        );

        const result = captains.map(([id, [captLng, captLat]]) => ({
          id,
          lat: parseFloat(captLat),
          lng: parseFloat(captLng),
        }));

        socket.emit("NEARBY_CAPTAINS", result);
        console.log("nearby captains ", result)
      } catch (err) {
        console.error("Error fetching nearby captains:", err);
        socket.emit("NEARBY_CAPTAINS", []);
      }
    });

    socket.on("disconnect", async () => {
      await redis.zrem("captains:online", socket.user.id);
      console.log("Captain offline");
    });
  });
};
