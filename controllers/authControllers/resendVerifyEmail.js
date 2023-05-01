const { User } = require("../../models");
const { HttpError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, "Email not found");
	}
	if (user.verify) {
		throw HttpError(400, "Verification has already been passed");
	}

	await sendEmail(email, user.verificationToken);

	res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
