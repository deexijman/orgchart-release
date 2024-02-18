import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { CustomError } from "../utils/CustomError.js";

// register handler
export const registerHandler = asyncErrorHandler(async (req, res, next) => {

  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  const email = req.body.email;

  const admin = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
  };
  const newAdmin = await Admin.create(admin);

  if (!newAdmin) {
    const err = new CustomError("Failed to create Admin", 500);
    return next(err);
  }
  res.status(200).json({ message: "Admin created successfully", email: email });
  
});
