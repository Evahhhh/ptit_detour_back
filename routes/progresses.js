const express = require("express");
const router = express.Router();
const progressesController = require("../controllers/progresses");
const { protect } = require("../middlewares/auth");

router
  .route("/progresses")
  .post(protect, progressesController.createProgress)
  .get(progressesController.getAllProgresses)
  .put(protect, progressesController.updateProgress);

router
  .route("/progresses/:id")
  .get(progressesController.getProgressById)

module.exports = router;
