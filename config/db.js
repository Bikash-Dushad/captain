const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// Construct MongoDB Atlas URI
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });

    // console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    // process.exit(1);
  }
};

module.exports = connectDB;
