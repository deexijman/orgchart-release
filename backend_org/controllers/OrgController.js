import User from "../models/Users.js";
import { HIERARCHY, DEPARTMENTS } from "../utils/data.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}); // Find all Users
    res.status(200).json({
      message: "Fetched all users successfully",
      data: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch all the users",
    });
  }
};

export const getHierarchy = async (req, res) => {
  try {
    const bodyParameters = {
      email: req.body.email,
      reportsTo: req.body.reportsTo === "null" ? null : req.body.reportsTo,
    };

    console.log(bodyParameters, "anush");

    console.log("get body params", bodyParameters);
    //check if the credentials sent are actually valid - starts
    try {
      const user = await User.findOne({ email: req.body.email });
      user === null && res.status(404).json({ message: "User doesnt Exist" });
    } catch (e) {
      console.log("errorrre");
    }

    //check if the credentials sent are actually valid - end

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

      console.log("show next reports to : ", nextReportsTo);
    } while (nextReportsTo !== null);

    res.status(200).json(hierarchyArr);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, Cannot fetch the hierarachy",
    });
  }
};

export const getRoles = async (req, res) => {
  try {
    const DOMAIN = req.query.DOMAIN;

    //check if domain exists - starts
    if (DOMAIN !== "PR" && DOMAIN !== "TECH")
      res.status(400).json({ message: "Domain doesn't  exist" });
    //check if domain exists - ends

    res.status(200).json({
      message: `sent roles from : ${DOMAIN}`,
      data: HIERARCHY[DOMAIN].filter((data) => data != "CFO" && data != "CTO"),
    });
  } catch (error) {
    res.status(500).send({
      message: `Failed to fetch roles from : ${DOMAIN}`,
    });
  }
};

export const getDept = async (req, res) => {
  try {
    const DOMAIN = req.query.DOMAIN;
    //check if domain exists - starts
    if (DOMAIN !== "PR" && DOMAIN !== "TECH")
      res.status(400).json({ message: "Domain doesn't  exist" });
    //check if domain exists - ends

    res.status(200).json({
      message: `Sent all departments from : ${DOMAIN}`,
      data: DEPARTMENTS[DOMAIN],
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed to fetch departments from : ${DOMAIN}`,
    });
  }
};

export const getSenior = async (req, res) => {
  try {
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
      res.status(505).json({
        message: `Bad input make sure ${ROLE} and ${DEPARTMENT} are correct`,
      });
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

    res.status(200).send({
      message: "Senior email array sent successfully",
      data: emails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching the senior email array",
    });
  }
};

export const getSameDesignation = async (req, res) => {
  const reportsTo = req.body.reportsTo;

  console.log('body log', req.body)

  console.log("Same design check", reportsTo)

  try {
    const employees = await User.find({ reportsTo: reportsTo });
    console.log("1", employees);

    if (employees === null) {
      res.status(200).json({
        data: [],
      });
    }

    console.log(employees);

    res.status(200).json({
      data: employees,
    });
  } catch (e) {
    res.status(500).send("Interal Server Error");
  }
};

export const getPeopleReportingToCurrentUser = async (req, res) => {

  try {

    const email = req.body.email
    console.log("Email for once",email)

    const user = await User.find({ reportsTo: email })
    console.log("Email for once",user)

    res.status(200).json({
      data: user,
      message: "Fetched successfully"
    })

  } catch (e) {
    res.status(400).send("Failed to fetch")
  }
}
