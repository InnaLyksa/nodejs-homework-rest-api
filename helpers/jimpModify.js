const Jimp = require("jimp");
const { HttpError } = require("./HttpError");

const jimpModify = async filePath => {
	await Jimp.read(filePath)
		.then(img => {
			return img.cover(250, 250).write(filePath);
		})
		.catch(err => {
			console.log(err);
			throw HttpError(404, err.message);
		});
};
module.exports = jimpModify;
