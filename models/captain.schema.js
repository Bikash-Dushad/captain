const mongoose = require("mongoose");

const captainSchema = new mongoose.Schema(
  {
    authId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others", ""],
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    license: {
      number: String,
      expiryDate: Date,
      frontImage: String,
      backImage: String,
      verified: { type: Boolean, default: false },
      verifiedAt: Date,
      verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
    },
    bankDetails: {
      accountHolderName: String,
      accountNumber: String,
      ifscCode: String,
      bankName: String,
      branch: String,
      upiId: String,
      verified: { type: Boolean, default: false },
    },
    documents: {
      aadharCard: { number: String, frontImage: String, backImage: String },
      panCard: { number: String, image: String },
      medicalCertificate: { expiryDate: Date, document: String }
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Captain", captainSchema);
