const { Contact, validationSchema, updateFavoriteSchema } = require("./contact");
const { User, loginSchema, registerSchema, updateSubcriptionSchema } = require("./user");

module.exports = {
	Contact,
	validationSchema,
	updateFavoriteSchema,
	User,
	loginSchema,
	registerSchema,
	updateSubcriptionSchema,
};
