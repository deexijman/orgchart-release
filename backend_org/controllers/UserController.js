import User from "../models/Users.js";
import { CustomError } from "../utils/CustomError.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { HIERARCHY, DEPARTMENTS } from "../utils/data.js";

export const userRegistration = asyncErrorHandler(async (req, res, next) => {
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
    const err = new CustomError("User already exists", 409);
    return next(err);
  }
  // User does not exist, proceed to create the user
  const user = await User.create(formData);
  console.log("User created successfully");
  return res.status(200).send("User created successfully");
});

//added new
export const getUserData = asyncErrorHandler(async (req, res, next) => {
  const EMAIL = req.query.EMAIL;

  console.log('Got emai',EMAIL)

  const user = await User.findOne({ email: EMAIL });

  const isExisting = await User.findOne({ email: EMAIL });

  if (!isExisting) {
    console.log("USER DOES NOT EXISTS");
    const err = new CustomError("USER DOESNOT EXISTS", 404);
    return next(err);
  }

  return res.status(200).json({
    message: "Fetched User Successfully",
    data: user,
  });
});

// added new
export const delUser = asyncErrorHandler(async (req, res, next) => {
  const LAST = req.query.LAST;
  const EMAIL = req.query.EMAIL;
  const ALTERNATE = req.query.ALTERNATE;
  let user;

  //handle reports to when the terminated person is not at leaf designation
  if (LAST === "false") {
    const updatedDocs = await User.updateMany(
      { reportsTo: `${EMAIL}` },
      { $set: { reportsTo: `${ALTERNATE}` } }
    );
  }

  user = await User.deleteOne({ email: EMAIL });

  console.log("USER DELETE SUCCESSFULLY, ", user);
  return res.status(200).json({
    message: "Deleted Successfullt!!",
  });

});

export const promoteUser = asyncErrorHandler( async(req, res, next) =>{

  const {
    DOMAIN,
    DESIGNATION,
    DEPARTMENTS,
    EMAIL,
    PROMOTE_DESIGNATION,
    REPORT_TO, // promoted employee report to 
    JR_EMAIL_USERS, // list of all employees who should be redirected
    JR_REPORTS_TO // whom to redirect juniors to
  } = req.body

})
