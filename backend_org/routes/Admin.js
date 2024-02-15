import { registerHandler } from "../controllers/AdminController.js";

import express from "express";

const adminRouter = express.Router();

//register admin to the

// register   admin  -> /api/register/admin all details like   NAME EMAIL PASSWORD will be sent in body.
///changed to api/admin/register
adminRouter.post("/register", registerHandler);

export default adminRouter;
