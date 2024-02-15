import express from "express";
import { loginHandler } from "../controllers/LoginController.js";

const loginRouter = express.Router();

// login route for both user and admin ,  ROLE = "USER/ADMIN" is the query parameter.
// /api/login  ROLE = "USER/ADMIN" , EMAIL , PASSWORD WILL BE TAKEN IN BODY -> LOGGING IN
loginRouter.post("/login", loginHandler);

export default loginRouter;
