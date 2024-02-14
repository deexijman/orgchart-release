import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import User from "./models/Users.js";
import mongoose from "mongoose";
import Admin from "./models/Admin.js";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
app.use(cors());

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PSWD = process.env.MONGO_PSWD;

const mongoURI = `mongodb+srv://${MONGO_USER}:${MONGO_PSWD}@organizationchart.wvqbdvo.mongodb.net/OrganizationChart`; // Your MongoDB URI
const dbName = "OrganizationChart"; // Your database name
const collectionName = "Users"; // Your collection name

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false, // Disable command bufferin
});

const HIERARCHY = {
    PR: ["CFO", "MANAGER", "SENIOR_HR", "JUNIOR_HR"],
    TECH: ["CTO", "TRIBE_MASTER", "TEAM_LEAD", "DEVELOPER"],
};

const DEPARTMENTS = {
    PR: ["BUSINESS_MANAGEMENT", "FINANCIAL_SERVICES"],
    TECH: ["FULL_STACK", "DATA_ENGINEER", "UI"],
};

// GET - get all users - TEST ROUTE
app.get("/api/getallusers", async (req, res) => {
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
});

// POST - get hierarchy for chart
app.post("/api/getorgchart", async (req, res) => {
    try {
        const bodyParameters = {
            email: req.body.email,
            reportsTo: req.body.reportsTo === 'null' ? null : req.body.reportsTo,
        };

        console.log(bodyParameters, "anush")

        console.log('get body params', bodyParameters)
        //check if the credentials sent are actually valid - starts
        try {
            const user = await User.findOne({ email: req.body.email });
            user === null && res.status(404).json({ message: "User doesnt Exist" });
        }
        catch (e) {
            console.log("errorrre")
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
});

//  GET /API/GETROLES?DOMAIN="TECH" (/"PR") -> returns the array of all roles from hierarchical array
app.get("/api/getroles", async (req, res) => {
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
});

// GET /API/GETDEPT?DOMAIN="TECH" (/"PR") -> returns the array of all DEPARTMENTS in the particular domain
app.get("/api/getdept", async (req, res) => {
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
});

// GET /API/LISTSENIORNAMES?ROLE="TRIBE_MASTER"&DEPT="FULL_STACK" -> return all the emails of immediate senior in a department
app.get("/api/listseniornames", async (req, res) => {
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
});

// POST /API/ADDUSER -> SEND ALL THE DETAILS IN THE FORM, REQUEST.BODY
app.post("/api/adduser", async (req, res) => {
    try {
        const formData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            department: req.body.department,
            reportsTo: req.body.reportsTo,
        };

        // Check if user already exists
        const isExisting = await User.findOne({ email: req.body.email });

        if (isExisting) {
            // User already exists, send a conflict response
            console.log("User already exists");
            return res.status(409).send("User already exists");
        } else {
            // User does not exist, proceed to create the user
            const user = await User.create(formData);
            console.log("User created successfully");
            return res.status(200).send("User created successfully");
        }
    } catch (error) {
        // Handle errors and send an error response back to the client
        console.error('Error creating user:', error);
        return res.status(500).send("Internal server error, Failed to create user");
    }
});


// user / admin
// /api/login  ROLE = "USER/ADMIN" , EMAIL , PASSWORD WILL BE TAKEN IN BODY -> LOGGING IN
app.post("/api/login", async (req, res) => {
    try {
        const NAME = req.body.NAME;
        const ROLE = req.body.ROLE.toUpperCase();
        const EMAIL = req.body.EMAIL;
        const PASSWORD = req.body.PASSWORD;

        console.log('passed to the logger', {
            ROLE,
            EMAIL,
            PASSWORD,
        })

        if (ROLE === "USER") {
            //FIND IF USER IS THERE
            const user = await User.findOne({ email: EMAIL, password: PASSWORD });
            console.log('logged user ', user)

            if (user === null) {
                // If user is not found, send an error response to the client
                res.status(401).send('Wrong credentials!');
            } else {
                // If user is found, continue with the rest of your logic
                // For example, you can send a success response or perform additional operations

                const { name, email, role, reportsTo } = user;

                res.status(200).json({
                    name: name,
                    email: email,
                    role: role,
                    reportsTo: reportsTo,
                    accessRole: ROLE,
                });
            }
            // user === null  && res.status(440).json({ message: '"Wrong credentials!"' });

        } else if (ROLE === "ADMIN") {

            //FIND IF admin IS THERE
            const admin = await Admin.findOne({ email: EMAIL })

            if (admin === null) {
                res.status(400).send("Wrong credentials!");
            } else {
                //IF admin IS THERE CHECK IF PASSWORD IS CORRECT
                const isvalidated = await bcrypt.compare(PASSWORD, admin.password)
                !isvalidated && res.status(400).send("Wrong credentials!");

                const { name, email } = admin

                res.status(200).json({
                    name: name,
                    email: email,
                    accessRole: ROLE
                })
            }

        } else {
            res.status(500).send("Role has to be either User or Admin");
        }
    } catch (e) {
        res.status(500).send("Internal server error occurred");
    }
});

// register   admin  -> /api/register/admin all details like   NAME EMAIL PASSWORD will be sent in body.
app.post("/api/register/admin", async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const email = req.body.email;

        const admin = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
        };
        const newAdmin = await Admin.create(admin);
        res
            .status(200)
            .json({ message: "Admin created successfully", email: email });
    } catch (err) {
        res.status(500).json({
            message: "Failed to create Admin",
        });
    }
});

// works with login
//works with
app.get('/api/org/workswith', async (req, res) => {

    const { reportsTo } = req.body

    console.log('1',reportsTo)

    try {
        const employees = await User.find({ reportsTo: reportsTo })
        console.log('1',employees)
        
        if (employees === null) {
            res.status(200).json({
                data: []
            })
        }

        console.log(employees)

        res.status(200).json({
            data: employees
        })


    }
    catch (e) {
        res.status(500).send("Interal Server Error")
    }


})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
