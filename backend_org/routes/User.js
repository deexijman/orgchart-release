import express from "express";

import { userRegistration } from "../controllers/UserController.js";

const userRouter = express.Router();

// POST /API/ADDUSER -> SEND ALL THE DETAILS IN THE FORM, REQUEST.BODY - OLD ROUTE
//changed to /api/user/register
userRouter.post("/register", userRegistration);

export default userRouter;
