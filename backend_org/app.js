import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/User.js";
import orgRouter from "./routes/Org.js";
import loginRouter from "./routes/Login.js";
import adminRouter from "./routes/Admin.js";
import mongoose from "mongoose";

//error handling
import { CustomError } from "./utils/CustomError.js";
import { globalErrorHandler } from "./controllers/ErrorController.js";

//

//handles uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log("Uncaught exception occurred, Shutting Down!!");

  process.exit(1);
});

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PSWD = process.env.MONGO_PSWD;

const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PSWD}@organizationchart.wvqbdvo.mongodb.net/OrganizationChart`; // Your MongoDB URI

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false, // Disable command bufferin
  })
  .then((conn) => {
    console.log("db connection successful");
  })
  .catch((e) => {
    console.log("Cannot Connect To DB");
  });

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

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//handle any unrejected promise - async codee...
process.on("unhandledRejection", (err) => {
  console.log(err.message);
  console.log("unhandled rejection occured shutting down");
  server.close(() => {
    // 1 - means uncaught exception
    process.exit(1);
  });
});
