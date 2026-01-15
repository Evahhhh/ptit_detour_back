const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../util/errorResponse');
const { Child, User } = require('../models');

// @desc    Get all children for the current user
// @route   GET /childs
// @access  Private
exports.getChildren = asyncHandler(async (req, res, next) => {
    const children = await Child.findAll({ where: { user_id: req.user.id } });

    res.status(200).json({
        success: true,
        data: children
    });
});

// @desc    Get a single child
// @route   GET /childs/:id
// @access  Private
exports.getChild = asyncHandler(async (req, res, next) => {
    const child = await Child.findOne({
        where: {
            id: req.params.id,
            user_id: req.user.id
        }
    });

    if (!child) {
        return next(new ErrorResponse(`Child not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
        success: true,
        data: child
    });
});

// @desc    Create a new child
// @route   POST /childs
// @access  Private
exports.createChild = asyncHandler(async (req, res, next) => {
    const { name, avatar_id, birthdate, energetic, scientific, focused, creative } = req.body;

    // The user_id is taken from the authenticated user
    const child = await Child.create({
        user_id: req.user.id,
        name,
        avatar_id,
        birthdate,
        energetic,
        scientific,
        focused,
        creative
    });

    res.status(201).json({
        success: true,
        data: child
    });
});

// @desc    Update a child
// @route   PUT /childs/:id
// @access  Private
exports.updateChild = asyncHandler(async (req, res, next) => {
    let child = await Child.findOne({
        where: {
            id: req.params.id,
            user_id: req.user.id
        }
    });

    if (!child) {
        return next(new ErrorResponse(`Child not found with id of ${req.params.id}`, 404));
    }

    const { name, avatar_id, birthdate, energetic, scientific, focused, creative } = req.body;

    await child.update({
        name,
        avatar_id,
        birthdate,
        energetic,
        scientific,
        focused,
        creative
    });
    
    // fetch the updated child to return it
    child = await Child.findByPk(req.params.id);

    res.status(200).json({
        success: true,
        data: child
    });
});

// @desc    Delete a child (soft delete)
// @route   DELETE /childs/:id
// @access  Private
exports.deleteChild = asyncHandler(async (req, res, next) => {
    const child = await Child.findOne({
        where: {
            id: req.params.id,
            user_id: req.user.id
        }
    });

    if (!child) {
        return next(new ErrorResponse(`Child not found with id of ${req.params.id}`, 404));
    }

    await child.destroy(); // This will perform a soft delete because of `paranoid: true`

    res.status(200).json({
        success: true,
        data: {}
    });
});
