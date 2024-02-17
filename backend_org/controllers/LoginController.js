import User from "../models/Users.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { CustomError } from "../utils/CustomError.js";

export const loginHandler = asyncErrorHandler(async (req, res, next) => {
  // try {
  const NAME = req.body.NAME;
  const ROLE = req.body.ROLE.toUpperCase();
  const EMAIL = req.body.EMAIL;
  const PASSWORD = req.body.PASSWORD;

  if (ROLE === "USER") {
    //FIND IF USER IS THERE
    const user = await User.findOne({
      name: NAME,
      email: EMAIL,
      password: PASSWORD,
    });

    if (user === null) {
      // If user is not found, send an error response to the client
      const err = new CustomError("Wrong credentials!", 401);
      return next(err);
    }
    // If user is found, continue with the rest of your logic
    // For example, you can send a success response or perform additional operations

    const { name, email, role, reportsTo } = user;

    res.status(200).json({
      name: name,
      email: email,
      role: role,
      reportsTo: reportsTo,
      accessRole: ROLE,
    });

    // user === null  && res.status(440).json({ message: '"Wrong credentials!"' });
  } else if (ROLE === "ADMIN") {
    //FIND IF admin IS THERE
    const admin = await Admin.findOne({ email: EMAIL });

    if (admin === null) {
      const err = new CustomError("Wrong credentials!", 400);
      return next(err);
    }
    //IF admin IS THERE CHECK IF PASSWORD IS CORRECT
    // try {
    const isvalidated = await bcrypt.compare(PASSWORD, admin.password);

    if (!isvalidated) {
      const err = new CustomError("Wrong credentials!", 400);
      return next(err);
    }

    const { name, email } = admin;

    res.status(200).json({
      name: name,
      email: email,
      accessRole: ROLE,
    });
    // } catch (error) {
    //   res.status(400).send(error.message);
    // }
  } else {
    const err = new CustomError("Role has to be either User or Admin", 500);
    return next(err);
  }
  // } catch (e) {
  //   res.status(500).send("Internal server error occurred");
  // }
});
