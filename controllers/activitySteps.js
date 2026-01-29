const asyncHandler = require("../middlewares/asyncHandler");
const { ActivityStep } = require("../models");
const ErrorResponse = require("../util/errorResponse");

module.exports.createActivityStep = asyncHandler(async (req, res, next) => {
  const { title, description, requirements, activity_id, outside, duration } = req.body;

  const activityStep = await ActivityStep.create({
    title,
    description,
    requirements,
    activity_id,
    outside,
    duration,
  });

  res.status(201).json({ activityStep });
});

module.exports.getAllActivitySteps = asyncHandler(async (req, res, next) => {
  const { activity_id } = req.query;
  const options = {};

  if (activity_id) {
    options.where = { activity_id };
  }

  const activitySteps = await ActivityStep.findAll(options);
  res.status(200).json({ activitySteps });
});

module.exports.getActivityStepById = asyncHandler(async (req, res, next) => {
  const activityStep = await ActivityStep.findByPk(req.params.id);

  if (!activityStep) {
    return next(
      new ErrorResponse(`ActivityStep not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ activityStep });
});

module.exports.getActivityStepsByActivityId = asyncHandler(
  async (req, res, next) => {
    const { activity_id } = req.params;

    const activitySteps = await ActivityStep.findAll({
      where: { activity_id },
    });

    if (!activitySteps || activitySteps.length === 0) {
      return next(
        new ErrorResponse(
          `ActivitySteps not found with activity_id of ${activity_id}`,
          404
        )
      );
    }

    res.status(200).json({ activitySteps });
  }
);
