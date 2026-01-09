const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    captain: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Captain",
      required: true,
    },
    type: {
      type: String,
      enum: ["bike", "car", "auto", "schooty"],
      required: true,
    },
    model: String,
    brand: String,
    year: Number,
    color: String,
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    registrationState: String,
    registrationDate: Date,
    registrationExpiry: Date,
    rcBook: {
      frontImage: String,
      backImage: String,
      verified: Boolean,
    },
    insurance: {
      number: String,
      company: String,
      expiryDate: Date,
      document: String,
    },
    pollutionCertificate: {
      number: String,
      expiryDate: Date,
      document: String,
    },
    features: [String], // ["AC", "Music", "WiFi"]
    capacity: Number, // Number of seats
    fuelType: {
      type: String,
      enum: ["petrol", "diesel", "electric", "cng", "hybrid"],
    },
    photos: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
