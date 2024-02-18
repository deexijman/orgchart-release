import User from "../models/Users.js";
import { CustomError } from "../utils/CustomError.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import { HIERARCHY, DEPARTMENTS } from "../utils/data.js";

export const getAllUsers = asyncErrorHandler(async (req, res, next) => {
  const allUsers = await User.find({}); // Find all Users

  if (!allUsers) {
    const err = new CustomError("Failed to fetch all the users", 500);
    return next(err);
  }
  res.status(200).json({
    message: "Fetched all users successfully",
    data: allUsers,
  });
});

export const getHierarchy = asyncErrorHandler(async (req, res, next) => {
  const bodyParameters = {
    email: req.body.email,
    reportsTo: req.body.reportsTo === "null" ? null : req.body.reportsTo,
  };
  
  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    const err = new CustomError("User doesnt Exist", 404);
    return next(err);
  }


  const hierarchyArr = [];
  let nextReportsTo = bodyParameters.reportsTo;
  let currentEmailHolder = bodyParameters.email;

  let firstEntry = true;

  do {
    let cursor;

    if (firstEntry === true) {
      cursor = await User.find({
        reportsTo: nextReportsTo,
        email: currentEmailHolder,
      });
      firstEntry = false;
    } else {
      cursor = await User.find({ email: nextReportsTo });
    }

    const documents = cursor;

    if (documents.length > 0) {
      const latestDoc = documents[0]; // Assuming only one document matches reportsTo
      hierarchyArr.push(latestDoc);

      nextReportsTo = latestDoc.reportsTo;
    } else {
      // If no document matches nextReportsTo, terminate the loop
      break;
    }
  } while (nextReportsTo !== null);

  res.status(200).json(hierarchyArr);
});


export const getRoles = (req, res, next) => {
  const DOMAIN = req.query.DOMAIN;

  //check if domain exists - starts
  if (DOMAIN !== "PR" && DOMAIN !== "TECH") {
    const err = new CustomError("Domain doesn't  exist", 400);
    return next(err);
  }

  //check if domain exists - ends
  res.status(200).json({
    message: `sent roles from : ${DOMAIN}`,
    data: HIERARCHY[DOMAIN].filter((data) => data != "CFO" && data != "CTO"),
  });
};

export const getDept = (req, res, next) => {

  const DOMAIN = req.query.DOMAIN;
  //check if domain exists - starts
  if (DOMAIN !== "PR" && DOMAIN !== "TECH")
    res.status(400).json({ message: "Domain doesn't  exist" });
  //check if domain exists - ends

  res.status(200).json({
    message: `Sent all departments from : ${DOMAIN}`,
    data: DEPARTMENTS[DOMAIN],
  });
};

export const getSenior = asyncErrorHandler(async (req, res, next) => {

  //const DOMAIN = req.query.DOMAIN
  const ROLE = req.query.ROLE;
  const DEPARTMENT = req.query.DEPARTMENT;

  let SENIOR_ROLE;

  // GET THE IMMEDIATE SENIOR ROLE
  if (HIERARCHY.PR.includes(ROLE)) {
    SENIOR_ROLE = HIERARCHY.PR[HIERARCHY.PR.indexOf(ROLE) - 1];
  } else if (HIERARCHY.TECH.includes(ROLE)) {
    SENIOR_ROLE = HIERARCHY.TECH[HIERARCHY.TECH.indexOf(ROLE) - 1];
  } else {
    const err = new CustomError(
      `Bad input make sure ${ROLE} and ${DEPARTMENT} are correct`,
      505
    );
    return next(err);
  }

  let SENIOR_EMAILS;
  if (SENIOR_ROLE === "CTO" || SENIOR_ROLE === "CFO") {
    SENIOR_EMAILS = await User.find({ role: SENIOR_ROLE }); // Find all documents
  } else {
    SENIOR_EMAILS = await User.find({
      role: SENIOR_ROLE,
      department: DEPARTMENT,
    }); // Find all documents that matches the ROLE and DEPRATMENT
  }

  //final set of emails that needs to be sent
  const emails = SENIOR_EMAILS.map((obj) => obj.email);

  const senioremails = SENIOR_EMAILS.map((obj) => obj.reportsTo)

  if (!emails) {
    const err = new CustomError("Error fetching the senior email array", 500);
    return next(err);
  }

  res.status(200).send({
    message: "Senior email array sent successfully",
    data: emails,
    seniordata : senioremails
  });
});

export const getSameDesignation = asyncErrorHandler(async (req, res, next) => {
  const reportsTo = req.body.reportsTo;

  const employees = await User.find({ reportsTo: reportsTo });

  if (employees === null) {
    res.status(200).json({
      data: [],
    });
  }

  res.status(200).json({
    data: employees,
  });
});

export const getPeopleReportingToCurrentUser = asyncErrorHandler(
  async (req, res, next) => {

    const email = req.body.email;

    const users = await User.find({ reportsTo: email });

    if (!users) {
      const err = new CustomError(
        "Failed to fetch people reporting to current user",
        500
      );
      return next(err);
    }

    res.status(200).json({
      data: users,
      message: "Fetched successfully",
    });
  }
);
