import express from "express";

import {
  delUser,
  getUserData,
  userRegistration,
} from "../controllers/UserController.js";

const userRouter = express.Router();

// POST /API/ADDUSER -> SEND ALL THE DETAILS IN THE FORM, REQUEST.BODY - OLD ROUTE
//changed to /api/user/register
userRouter.post("/register", userRegistration);

//added new
//get user details
userRouter.get("/", getUserData);

//added new
//delete user
userRouter.delete("/", delUser);

export default userRouter;
