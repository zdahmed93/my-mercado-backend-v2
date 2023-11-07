const uploader = require("../utilities/multer-config");

module.exports = uploader.single("photo") // "photo" is the key of the file to upload in the form-data
