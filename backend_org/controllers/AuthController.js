import jwt from "jsonwebtoken";
import { promisify } from "util";
import { asyncErrorHandler } from "../utils/asyncErrorHandler";
import User from "../models/Users";
import Admin from "../models/Admin";
import { CustomError } from "../utils/CustomError";

export const isAllowed = asyncErrorHandler(async (req, res, next) => {
  const { EMAIL } = req.body;
  //1 . read the tokem & verify if exists
  const testToken = req.headers.authorization;
  let token;

  if (testToken && testToken.startsWith("bearer")) {
    token = testToken.split(" ")[1];
  }

  if (!token) {
    next(new CustomError("You are not logged in!!", 401));
  }

  //2.verify if token is valid

  const decoded_token = await promisify(jwt.verify)(token, "secret_key");
  console.log(decoded_token);

  // 3. check if user exists

  const user = await User.findOne({ email: EMAIL });
  const admin = await Admin.findOne({ email: EMAIL });

  if (!user && !admin) {
    const err = new CustomError(
      "User / Admin with given token Doesnt exists",
      404
    );
    return next(err);
  }

  //4. if user changed password once the token has been issued

  //5. allow use to access
  next();
});

export const isAuthorized = (role) => {
  return (req, res, next) => {
    const curr_role = req.query.ROLE;
    if (role === curr_role.toLowerCase()) {
      const err = new CustomError(
        "You dont have permission to perform this action",
        403
      );
      return next(err);
    }

    next();
  };
};