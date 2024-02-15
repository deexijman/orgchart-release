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

//--------------
app.use("/api/user", userRouter);

app.use("/api/org", orgRouter);

app.use("/api/auth", loginRouter);

app.use("/api/admin", adminRouter);
//-----------

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
