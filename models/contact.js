const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError, patterns } = require("../helpers");

const { nameRegexp, phoneRegexp } = patterns;

const validationSchema = Joi.object({
	name: Joi.string()
		.min(2)
		.max(30)
		.pattern(nameRegexp)
		.messages({
			"string.pattern.base": "Invalid name. The name must contain only letters.",
			"any.required": `"name" is a required field`,
		})
		.required(),
	email: Joi.string()
		.email({ minDomainSegments: 2 })
		.messages({
			"string.pattern.base": "Invalid email. The email must be valid.",
			"any.required": `"email" is a required field`,
		})
		.required(),
	phone: Joi.string()
		.pattern(phoneRegexp)
		.messages({
			"string.pattern.base": "Invalid phone number format. The format should be (XXX) XXX-XXXX.",
			"any.required": `"phone" is a required field`,
		})
		.required(),
	favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

module.exports = validationSchema;

const contactSchema = new Schema(
	{
		name: {
			type: String,
			match: nameRegexp,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			match: phoneRegexp,
			required: true,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
	},

	{ versionKey: false, timestamps: true },
);

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, validationSchema, updateFavoriteSchema };
