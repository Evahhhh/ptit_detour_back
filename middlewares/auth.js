const { verify } = require("../util/jwt");
const { User, Avatar, Premium } = require("../models");
const ErrorResponse = require("../util/errorResponse");

exports.protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(new ErrorResponse("Not authorized", 401));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(new ErrorResponse("Token missing", 401));
    }

    const userVerified = await verify(token);
    if (!userVerified) {
      return next(new ErrorResponse("Invalid token", 401));
    }

    req.loggedUser = {
      id: userVerified.id,
      email: userVerified.email
    };

    next();
  } catch (error) {
    next(error);
  }
};
