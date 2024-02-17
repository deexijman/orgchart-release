import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/User.js";
import orgRouter from "./routes/Org.js";
import loginRouter from "./routes/Login.js";
import adminRouter from "./routes/Admin.js";
import mongoose from "mongoose";

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PSWD = process.env.MONGO_PSWD;

const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PSWD}@organizationchart.wvqbdvo.mongodb.net/OrganizationChart`; // Your MongoDB URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  bufferCommands: false, // Disable command bufferin
});

//error handling
import { CustomError } from "./utils/CustomError.js";
import { globalErrorHandler } from "./controllers/ErrorController.js";

//

//--------------
app.use("/api/user", userRouter);

app.use("/api/org", orgRouter);

app.use("/api/auth", loginRouter);

app.use("/api/admin", adminRouter);
//-----------

// error handler

app.all("*", (req, res, next) => {
  // const err = new Error(`Cant find ${req.originalUrl} on server`);
  // err.statusCode = 404;
  // //when we pass the error obj to the next() express automatically assumes that error has occured and calls the error handling middleware
  // next(err);

  const err = new CustomError(`Cant find ${req.originalUrl} on server`, 404);
  next(err);
});

//global middleware for error handling

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
