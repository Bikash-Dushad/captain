const jwt = require("jsonwebtoken");

module.exports = (socket, next) => {
  const token = socket.handshake.auth?.token;

  if (!token) return next(new Error("Token missing"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded; // { authId, role }
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
};
