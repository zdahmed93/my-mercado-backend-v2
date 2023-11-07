const multer = require('multer');

module.exports = multer({
    storage: multer.diskStorage({
        destination: "uploads-tmp"
    })
});