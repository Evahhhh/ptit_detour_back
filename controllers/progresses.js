const asyncHandler = require("../middlewares/asyncHandler");
const { Progress } = require("../models");
const ErrorResponse = require("../util/errorResponse");

// @desc    Create a progress
// @route   POST /api/v1/progresses
// @access  Private
module.exports.createProgress = asyncHandler(async (req, res, next) => {
  const { activity_step_id, progress_status_id } = req.body;

  const dataToCreate = {
    activity_step_id,
    progress_status_id,
  };

  // If status is '99' (finished), set the final_status_date
  if (progress_status_id === '99' || progress_status_id === 99) {
    dataToCreate.final_status_date = new Date();
  }

  const progress = await Progress.create(dataToCreate);

  res.status(201).json({ progress });
});

// @desc    Get all progresses
// @route   GET /api/v1/progresses
// @access  Public
module.exports.getAllProgresses = asyncHandler(async (req, res, next) => {
  const progresses = await Progress.findAll();
  res.status(200).json({ progresses });
});

// @desc    Get a single progress
// @route   GET /api/v1/progresses/:id
// @access  Public
module.exports.getProgressById = asyncHandler(async (req, res, next) => {
  const progress = await Progress.findByPk(req.params.id);

  if (!progress) {
    return next(
      new ErrorResponse(`Progress not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ progress });
});

// @desc    Update a progress
// @route   PUT /api/v1/progresses/:id
// @access  Private
module.exports.updateProgress = asyncHandler(async (req, res, next) => {
    const { progress_id, progress_status_id } = req.body;
    let progress = await Progress.findByPk(progress_id);

    if (!progress) {
        return next(
            new ErrorResponse(`Progress not found with id of ${req.params.id}`, 404)
        );
    }
    
    const dataToUpdate = { progress_status_id };
    // If new status is '99' and it wasn't '99' before, set the date.
    if ((progress_status_id === '99' || progress_status_id === 99) && progress.progress_status_id !== '99') {
        dataToUpdate.final_status_date = new Date();
    } else if (progress_status_id !== '99' && progress_status_id !== 99) {
        // If status is changed from 99 to something else, clear the date.
        dataToUpdate.final_status_date = null;
    }

    progress = await progress.update(dataToUpdate);

    res.status(200).json({ progress });
});
