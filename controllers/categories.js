const asyncHandler = require("../middlewares/asyncHandler");
const { Category } = require("../models");
const ErrorResponse = require("../util/errorResponse");

module.exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return next(new ErrorResponse("Please provide a category name", 400));
  }

  const category = await Category.create({ name });

  res.status(201).json({ category });
});

module.exports.getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.findAll();
  res.status(200).json({ categories });
});

module.exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await Category.findByPk(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ category });
});
