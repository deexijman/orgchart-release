import express from "express";
import {
  getAllUsers,
  getDept,
  getHierarchy,
  getRoles,
  getSenior,
  getWorksWith,
} from "../controllers/OrgController.js";

const orgRouter = express.Router();

//returns all the existing users in the database
// GET - get all users - TEST ROUTE
// /api/getallusers
orgRouter.get("/allusers", getAllUsers);

//returns the hierarchy chart of the user provided.
// POST - get hierarchy for chart
// /api/getorgchart
orgRouter.post("/orgchart", getHierarchy);

//returns all the available roles in the company
//  GET /API/GETROLES?DOMAIN="TECH" (/"PR") -> returns the array of all roles from hierarchical array
// /api/org/roles
orgRouter.get("/roles", getRoles);

//return all the available departments in the company
// GET /API/GETDEPT?DOMAIN="TECH" (/"PR") -> returns the array of all DEPARTMENTS in the particular domain
///api/org/getdept
orgRouter.get("/dept", getDept);

//returns all the email ids of the senior that the provided user has to report to
// GET /API/LISTSENIORNAMES?ROLE="TRIBE_MASTER"&DEPT="FULL_STACK" -> return all the emails of immediate senior in a department
orgRouter.get("/senior", getSenior);

//returns all the people who works along the provided user
// works with login
//works with
orgRouter.get("/workswith", getWorksWith);

export default orgRouter;
