const router = require("express").Router();

// const {imageUpload, fileUpload, reducedImageUpload, localFileUpload} = require("../controllers/fileUploadController");
const {localFileUpload, imageUpload, videoUpload} = require("../controllers/fileUploadController");

router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
// router.post("/fileUpload", fileUpload);
// router.post("reducedImageUpload", reducedImageUpload);
router.post("/localFileUpload", localFileUpload);

module.exports = router;