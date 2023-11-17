const express = require("express");
const restrict = require("../middlewares/authenticate");
const { addImage, getImages, getImageById, editImage, deleteImage } = require("../controllers/images.controller");
const multer = require("multer")();
const router = express.Router();

router.use(restrict);
router.post("/", multer.single('image'), addImage);
router.get("/", getImages);
router.get("/:id", getImageById);
router.put("/:id", editImage);
router.delete("/:id", deleteImage);

module.exports = router;