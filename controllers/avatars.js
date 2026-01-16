const asyncHandler = require("../middlewares/asyncHandler");
const { Avatar } = require("../models");
const ErrorResponse = require("../util/errorResponse");

module.exports.createAvatar = asyncHandler(async (req, res, next) => {
  const url = req.body.avatar;
  console.log(req.body.avatar);
  if (!url) {
    return next(new ErrorResponse("Please provide an avatar URL", 400));
  }

  const avatar = await Avatar.create({ url });

  res.status(201).json({ avatar });
});

module.exports.getAllAvatars = asyncHandler(async (req, res, next) => {
  const avatars = await Avatar.findAll();
  res.status(200).json({ avatars });
});
