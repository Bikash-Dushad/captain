const redis = require("../config/redis");
const { producer } = require("../kafka/producer");
const Topics = require("../kafka/topics");

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
        console.log("location added", lng, lat);

        await producer.send({
          topic: Topics.CAPTAIN_LOC_UPDATED,
          messages: [
            {
              value: JSON.stringify({
                id: socket.user.id,
                lat,
                lng,
                timestamp: Date.now(),
                online: true,
              }),
            },
          ],
        });
        console.log("📤 location sent to kafka");
      }
    });

    socket.on("disconnect", async () => {
      await redis.zrem("captains:online", socket.user.id);
      console.log("Captain offline");
      await producer.send({
        topic: Topics.CAPTAIN_LOC_UPDATED,
        messages: [
          {
            value: JSON.stringify({
              id: socket.user.id,
              online: false,
              timestamp: Date.now(),
            }),
          },
        ],
      });
      console.log("📤 offline status sent to kafka");
    });
  });
};
