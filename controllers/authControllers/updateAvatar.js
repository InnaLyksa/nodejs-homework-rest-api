const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../", "../", "public", "avatars");

const updateAvatar = async (req, res) => {
	const { _id } = req.user;
	const { path: tempUpload, originalname } = req.file;

	const newFileName = `${_id}_${originalname}`;

	const resultUpload = path.join(avatarsDir, newFileName);

	await Jimp.read(tempUpload)
		.then(img => {
			return img.cover(250, 250).write(tempUpload);
		})
		.catch(err => {
			console.log(err);
			throw HttpError(404, err.message);
		});

	await fs.rename(tempUpload, resultUpload);

	const avatarURL = path.join("avatars", newFileName);
	await User.findByIdAndUpdate(_id, { avatarURL });
	res.json({
		avatarURL,
	});
};

module.exports = updateAvatar;
