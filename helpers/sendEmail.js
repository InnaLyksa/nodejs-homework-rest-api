const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const { SENDGRID_API_KEY, BASE_URL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (email, verificationToken) => {
	const verifyEmail = {
		to: email,
		from: "in.lyksa@gmail.com",
		subject: "Verify email",
		html: `<a style="font-size:18px" target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to verify email</a>`,
	};

	await sgMail.send(verifyEmail);

	return true;
};

module.exports = sendEmail;
