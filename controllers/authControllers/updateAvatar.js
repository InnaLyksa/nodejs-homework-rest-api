const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models");
const { jimpModify } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
	const { _id } = req.user;
	const { path: tempUpload, originalname } = req.file;

	const newFileName = `${_id}_${originalname}`;

	const resultUpload = path.join(avatarsDir, newFileName);

	await jimpModify(tempUpload);

	await fs.rename(tempUpload, resultUpload);

	const avatarURL = path.join("avatars", newFileName);
	await User.findByIdAndUpdate(_id, { avatarURL });
	res.json({
		avatarURL,
	});
};

module.exports = updateAvatar;
