const kafka = require("../config/kafka");
const { NEW_BOOKING_REQUEST } = require("./topics");
const consumer = kafka.consumer({ groupId: "captain-service-group" });

const startBookingConsumer = async (io) => {
  await consumer.connect();
  await consumer.subscribe({
    topic: NEW_BOOKING_REQUEST,
    fromBeginning: false,
  });
  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const booking = JSON.parse(message.value.toString());
        console.log(
          `📥 Captain service received booking: ${booking.bookingId}`,
        );

        await notifyNearbyCaptains(io, booking);
      } catch (error) {
        console.error("Error processing booking request:", error);
      }
    },
  });
};

const notifyNearbyCaptains = async (io, booking) => {
  const { lat, lng } = booking.pickupLocation;

  const captains = await redis.georadius(
    "captains:online",
    lng,
    lat,
    5,
    "km",
    "WITHCOORD",
    "WITHDIST",
  );

  if (captains.length === 0) {
    console.log("⚠️ No captains available nearby");
    return 0;
  }

  captains.forEach(([captainId, [captLng, captLat], distance]) => {
    io.to(`captain:${captainId}`).emit("NEW_BOOKING_REQUEST", {
      bookingId: booking.bookingId,
      pickupLocation: booking.pickupLocation,
      captainLocation: {
        lat: parseFloat(captLat),
        lng: parseFloat(captLng),
      },
      distance,
      price: booking.price,
      user: {
        rating: booking.userRating,
      },
    });

    console.log(`📢 Booking ${booking.bookingId} sent to captain ${captainId}`);
  });

  return captains.length;
};

module.exports = { startBookingConsumer };
