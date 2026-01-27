const asyncHandler = require("../middlewares/asyncHandler");
const { Activity } = require("../models");
const ErrorResponse = require("../util/errorResponse");

// @desc    Get all activities
// @route   GET /activities
// @access  Public
exports.getActivities = asyncHandler(async (req, res, next) => {
  const activities = await Activity.findAll();
  res.status(200).json({
    success: true,
    data: activities,
  });
});

// @desc    Get single activity
// @route   GET /activities/:id
// @access  Public
exports.getActivity = asyncHandler(async (req, res, next) => {
  const activity = await Activity.findByPk(req.params.id);

  if (!activity) {
    return next(
      new ErrorResponse(`Activity not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: activity,
  });
});

// @desc    Create new activity
// @route   POST /activities
// @access  Private
exports.createActivity = asyncHandler(async (req, res, next) => {
  const {
    premium_id,
    category_id,
    title,
    description,
    requirements,
    min_age,
    max_age,
    duration,
    energitic,
    scientific,
    focused,
    creative,
  } = req.body;

  const activity = await Activity.create({
    premium_id,
    category_id,
    title,
    description,
    requirements,
    min_age,
    max_age,
    duration,
    energitic,
    scientific,
    focused,
    creative,
  });

  res.status(201).json({
    success: true,
    data: activity,
  });
});

// @desc    Update activity
// @route   PUT /activities/:id
// @access  Private
exports.updateActivity = asyncHandler(async (req, res, next) => {
  let activity = await Activity.findByPk(req.params.id);

  if (!activity) {
    return next(
      new ErrorResponse(`Activity not found with id of ${req.params.id}`, 404)
    );
  }

  if (activity.user_id !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this activity`,
        401
      )
    );
  }

  activity = await activity.update(req.body);

  res.status(200).json({
    success: true,
    data: activity,
  });
});

// @desc    Delete activity
// @route   DELETE /activities/:id
// @access  Private
exports.deleteActivity = asyncHandler(async (req, res, next) => {
  const activity = await Activity.findByPk(req.params.id);

  if (!activity) {
    return next(
      new ErrorResponse(`Activity not found with id of ${req.params.id}`, 404)
    );
  }

  if (activity.user_id !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this activity`,
        401
      )
    );
  }

  await activity.destroy();

  res.status(200).json({
    success: true,
    data: {},
  });
});
