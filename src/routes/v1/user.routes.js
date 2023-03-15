const express = require("express");
const userController = require("../../controllers/user.controller");
const { upload } = require("../../utils/upload");

const router = express.Router();



//get pages----------------------------------------------------
router.route("/").get(userController.homePage);
router.route("/encryption-decryption").get(userController.get_encryption);
router.route("/imgtotext").get(userController.get_imagetotxt);
router.route("/star-pattren").get(userController.get_starpartten);
router.route("/alertnate-background").get(userController.get_alternatebg);
router.route("/readlanguage").get(userController.get_readlanguage);
router.route("/fileupload").get(userController.get_fileupload);



//post pages----------------------------------------------------------------

router.route("/").post(userController.post_genrateQr);
router.route("/encryption-decryption").post(userController.post_encryption);
router.post('/fileupload',upload.single('image'),userController.post_fileupload)
router.post('/imgtotext',upload.single('image'),userController.post_imagetotxt)



module.exports = router;
