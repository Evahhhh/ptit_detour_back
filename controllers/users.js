const asyncHandler = require("../middlewares/asyncHandler");
const { User } = require("../models");
const ErrorResponse = require("../util/errorResponse");
const { sign } = require("../util/jwt");

module.exports.createUser = asyncHandler(async (req, res, next) => {
  const { email, password, name, role_id, avatar_id, premium_id } = req.body.user;

  fieldValidation(email, next);
  fieldValidation(password, next);
  fieldValidation(name, next);
  fieldValidation(role_id, next);
  fieldValidation(avatar_id, next);
  fieldValidation(premium_id, next);

  const user = await User.create({
    email: email,
    password: password,
    name: name,
    role_id: role_id,
    avatar_id: avatar_id,
    premium_id: premium_id
  });

  if (user.dataValues.password) {
    delete user.dataValues.password;
  }

  user.dataValues.token = await sign(user);

  res.status(201).json({ user });
});

module.exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body.user;

  fieldValidation(email, next);
  fieldValidation(password, next);

  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Wrong password", 401));
  }

  delete user.dataValues.password;

  user.dataValues.token = await sign(user);

  user.dataValues.bio = null;
  user.dataValues.image = null;

  res.status(200).json({ user });
});

module.exports.getCurrentUser = asyncHandler(async (req, res, next) => {
  const { loggedUser } = req;
  const user = await User.findByPk(loggedUser.id);

  if (!user) {
    return next(new ErrorResponse(`User not found`, 404));
  }

  user.dataValues.token = req.headers.authorization.split(" ")[1];

  res.status(200).json({ user });
});

module.exports.updateUser = asyncHandler(async (req, res, next) => {
  await User.update(req.body.user, {
    where: {
      id: req.loggedUser.id,
    },
  });

  const user = await User.findByPk(req.loggedUser.id);
  user.dataValues.token = req.headers.authorization.split(" ")[1];

  res.status(200).json({ user });
});

const fieldValidation = (field, next) => {
  if (!field) {
    return next(new ErrorResponse(`Missing fields`, 400));
  }
};
