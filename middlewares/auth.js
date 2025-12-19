const { verify } = require("../util/jwt");
const { User, Role, Avatar, Premium } = require("../models");
const ErrorResponse = require("../util/errorResponse");

exports.protect = async (req, res, next) => {
  try {
    const { headers } = req;
    if (!headers.authorization) return next();

    const token = headers.authorization.split(" ")[1];
    if (!token) throw new SyntaxError("Token missing or malformed");

    const userVerified = await verify(token);
    if (!userVerified) throw new Error("Invalid Token");

    req.loggedUser = await User.findOne({
      attributes: { exclude: ["password"] },
      where: { email: userVerified.email },
      include: [
        { model: Role, as: "role" },
        { model: Avatar, as: "avatar" },
        { model: Premium, as: "premium" },
      ],
    });

    if (!req.loggedUser) {
      return next(new ErrorResponse("User not found", 404));
    }

    req.loggedUser.dataValues.token = token;

    next();
  } catch (error) {
    next(error);
  }
};
