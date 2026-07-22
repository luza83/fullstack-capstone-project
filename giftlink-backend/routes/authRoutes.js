const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');
const pino = require('pino');  // Import Pino logger


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const logger = pino();  // Create a Pino logger instance

router.post('/register', async (req, res) => {
    try {
        // Task 1: Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
		const db = await connectToDatabase();

        // Task 2: Access MongoDB collection
		const collection = db.collection("users");
        if (!req.body.email || !req.body.password) {
            logger.warn({ email }, "Registration attempt missing required fields");
            return res
              .status(400)
              .json({ message: "Email and password are required" });
          }
		//Task 3: Check for existing email
		const existingEmail = await collection.findOne({ email: req.body.email });

        if (existingEmail) {
            logger.warn({ email }, "Registration attempt for existing user");
            return res.status(409).json({ message: "User already exists" });
          }
      
		const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
		const email = req.body.email;

        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        });

         //Task 5: Create JWT authentication with user._id as payload
         const payload = {
            user: {
                id: newUser.insertedId,
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);

        logger.info('User registered successfully');
        return res.json({authtoken,email});
    } catch (e) {
         return res.status(500).send('Internal server error');
    }
});

router.post("/login", async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("users");

        const { email, password } = req.body;

        if (!email || !password) {
            logger.warn({ email }, "Login attempt missing required fields");
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // Find user in MongoDB
        const existingUser = await collection.findOne({ email });

        if (!existingUser) {
            logger.warn({ email }, "Login attempt for unknown user");
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        // Compare passwords
        const isPasswordValid = await bcryptjs.compare(
            password,
            existingUser.password
        );

        if (!isPasswordValid) {
            logger.warn({ email }, "Invalid password");
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const payload = {
            user: {
                id: existingUser._id.toString(),
            },
        };

        // Generate JWT
        const authtoken = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "1h",
        });

        logger.info({ email }, "User logged in successfully");

        return res.json({
            authtoken,
            userName: existingUser.firstName,
            userEmail: existingUser.email,
        });

    } catch (error) {
        logger.error(error, "Login failed");

        return res.status(500).json({
            error: "Internal server error",
        });
    }
});
  
  module.exports = router;
  