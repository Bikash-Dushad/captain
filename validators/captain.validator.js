const Joi = require("joi");

const captainRegisterValidation = Joi.object({
  authId: Joi.string().required().messages({
    "string.empty": "Auth ID is required",
    "any.required": "Auth ID is required",
  }),
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name cannot exceed 100 characters",
    "any.required": "Auth ID is required",
  }),
  email: Joi.string().email().trim().lowercase().optional().allow("").messages({
    "string.email": "Please provide a valid email address",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must be 10 digits",
      "any.required": "Phone number is required",
    }),
  gender: Joi.string()
    .valid("male", "female", "others", "")
    .default("")
    .messages({
      "any.only": "Gender must be male, female, others, or empty",
    }),
  avatar: Joi.string().uri().optional().allow("").messages({
    "string.uri": "Avatar must be a valid URL",
  }),
  license: Joi.object({
    number: Joi.string().optional(),
    expiryDate: Joi.date().optional(),
    frontImage: Joi.string().uri().optional(),
    backImage: Joi.string().uri().optional(),
  }).optional(),

  bankDetails: Joi.object({
    accountHolderName: Joi.string().optional(),
    accountNumber: Joi.string().optional(),
    ifscCode: Joi.string()
      .pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)
      .optional()
      .messages({
        "string.pattern.base": "IFSC code must be valid (e.g., SBIN0001234)",
      }),
    bankName: Joi.string().optional(),
    branch: Joi.string().optional(),
    upiId: Joi.string().optional()
  }).optional(),

  documents: Joi.object({
    aadharCard: Joi.object({
      number: Joi.string()
        .pattern(/^[0-9]{12}$/)
        .optional()
        .messages({
          "string.pattern.base": "Aadhar must be 12 digits",
        }),
      frontImage: Joi.string().uri().optional(),
      backImage: Joi.string().uri().optional(),
    }).optional(),
    panCard: Joi.object({
      number: Joi.string()
        .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
        .optional()
        .messages({
          "string.pattern.base": "PAN must be in format ABCDE1234F",
        }),
      image: Joi.string().uri().optional(),
    }).optional(),
    medicalCertificate: Joi.object({
      expiryDate: Joi.date().optional(),
      document: Joi.string().uri().optional(),
    }).optional(),
  }).optional(),
});

module.exports = {
  captainRegisterValidation,
};
