const express = require("express");
const router = express.Router();
const avatarsController = require("../controllers/avatars");
const { protect } = require("../middlewares/auth");

router.post("/avatar", protect, avatarsController.createAvatar);
router.get("/avatars", protect, avatarsController.getAllAvatars);

module.exports = router;
