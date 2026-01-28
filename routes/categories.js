const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/categories");
const { protect } = require("../middlewares/auth");

router
  .route("/categories")
  .post(protect, categoriesController.createCategory)
  .get(categoriesController.getAllCategories);

router
  .route("/categories/:id")
  .get(categoriesController.getCategoryById);

module.exports = router;
