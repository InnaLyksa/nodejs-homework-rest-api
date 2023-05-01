const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");
const { v4 } = require("uuid");

const register = async (req, res) => {
	const { email, password, subscription } = req.body;
	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, "Email already in use'");
	}
	const hashPassword = await bcrypt.hash(password, 10);
	const verificationToken = v4();
	const avatarURL = gravatar.url(email);

	const newUser = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationToken });

	await sendEmail(email, verificationToken);

	res.status(201).json({ email: newUser.email, subscription: newUser.subscription });
};

module.exports = register;
