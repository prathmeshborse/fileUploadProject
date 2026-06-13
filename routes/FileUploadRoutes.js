const router = require("express").Router();

const {localFileUpload, imageUpload, videoUpload} = require("../controllers/fileUploadController");

router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/localFileUpload", localFileUpload);

module.exports = router;