const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const redis = require("./config/redis");
const socketInit = require("./sockets");

const app = express();
app.use(cors());
app.use(express.json());

const routes = require("./routers");
const { connectProducer } = require("./kafka/producer");

app.get("/captain", (req, res) => {
  res.send("Hi Captain!");
});

const port = process.env.PORT || 3003;

routes.forEach(({ path, router }) => {
  app.use(`/api${path}`, router);
});

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");

    const server = http.createServer(app);

    const io = new Server(server, {
      cors: { origin: "*" },
    });

    socketInit(io);
    server.listen(port, () => {
      console.log(`Captain Service running on http://localhost:${port}`);
    });
    connectProducer();
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
