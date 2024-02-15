import User from "../models/Users.js";

export const userRegistration = async (req, res) => {
  try {
    const formData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      department: req.body.department,
      reportsTo: req.body.reportsTo,
    };

    // Check if user already exists
    const isExisting = await User.findOne({ email: req.body.email });

    if (isExisting) {
      // User already exists, send a conflict response
      console.log("User already exists");
      return res.status(409).send("User already exists");
    } else {
      // User does not exist, proceed to create the user
      const user = await User.create(formData);
      console.log("User created successfully");
      return res.status(200).send("User created successfully");
    }
  } catch (error) {
    // Handle errors and send an error response back to the client
    console.error("Error creating user:", error);
    return res.status(500).send("Internal server error, Failed to create user");
  }
};
