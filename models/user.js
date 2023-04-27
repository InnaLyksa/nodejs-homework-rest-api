const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError, patterns } = require("../helpers");

const SUBSCRIPTION_TYPES = ["starter", "pro", "business"];

const registerSchema = Joi.object({
	password: Joi.string()
		.min(6)
		.messages({
			"string.min": `"password" should have a minimum  {#limit} characters`,
			"any.required": `"password" is a required field`,
		})
		.required(),
	email: Joi.string()
		.email({ minDomainSegments: 2 })
		.pattern(patterns.emailRegexp)
		.messages({
			"string.pattern.base": "Invalid email. The email must be valid.",
			"any.required": `"email" is a required field`,
		})
		.required(),
	subscription: Joi.string().valid(...SUBSCRIPTION_TYPES),
});

const loginSchema = Joi.object({
	password: Joi.string().required(),
	email: Joi.string().email({ minDomainSegments: 2 }).pattern(patterns.emailRegexp).required(),
	subscription: Joi.string().valid(...SUBSCRIPTION_TYPES),
});

const updateSubcriptionSchema = Joi.object({
	subscription: Joi.string().valid(...SUBSCRIPTION_TYPES),
});

const userSchema = new Schema(
	{
		password: {
			type: String,
			minlength: 6,
			required: [true, "Password is required"],
		},
		email: {
			type: String,
			match: patterns.emailRegexp,
			required: [true, "Email is required"],
			unique: true,
		},
		subscription: {
			type: String,
			enum: SUBSCRIPTION_TYPES,
			default: "starter",
		},
		token: {
			type: String,
			default: null,
		},
		avatarURL: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true },
);

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

module.exports = {
	User,
	loginSchema,
	registerSchema,
	updateSubcriptionSchema,
};
