const jwt = require("jsonwebtoken");

module.exports = (socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) return next(new Error("Token missing"));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    socket.user = decoded; // { id, role }
    next();
  } catch (err) {
    console.log("❌ Socket auth failed: Invalid token", err);
    next(new Error("Invalid token"));
  }
};
