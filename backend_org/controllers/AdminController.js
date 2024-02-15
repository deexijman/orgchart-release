import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";

// register handler
export const registerHandler = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const email = req.body.email;

    const admin = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
    };
    const newAdmin = await Admin.create(admin);
    res
      .status(200)
      .json({ message: "Admin created successfully", email: email });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create Admin",
    });
  }
};
