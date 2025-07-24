const express = require('express');
const router = express.Router();
const Admin = require("../models/admin");
const { validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config();

// ==============================
// ✅ ADMIN SIGNUP ROUTE
// ==============================
const signup = express.Router()
signup.post("/signup", [
    body("email").isEmail().withMessage("Email is invalid"),
    body("name").notEmpty().withMessage("Name is required"),
    body("role").notEmpty().withMessage("Role is required"),
    body("password")
        .isLength({ min: 5 }).withMessage("Password must be more than 5 characters")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/).withMessage("Password must be alphanumeric")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { name, email, password, role } = req.body;

        const isExists = await Admin.findOne({ email });
        if (isExists) {
            return res.status(400).json({ success: false, error: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newAdmin = await Admin.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        const token = jwt.sign(
            {
                name: newAdmin.name,
                email: newAdmin.email,
                adminId: newAdmin._id,
                role: newAdmin.role,
                isLoggedIn: true,
            },
            process.env.session_secret_key,
            { expiresIn: '1d' }
        );
        console.log("created admin id =", newAdmin._id);
        return res.status(200).json({ success: true, token, adminId: newAdmin._id, adminName: newAdmin.name, email: newAdmin.email });

    } catch (e) {
        console.error("Signup Error:", e.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

// ==============================
// ✅ ADMIN LOGIN ROUTE
// ==============================
const login = express.Router()
login.post("/login", [
    body("email").isEmail().withMessage("Email is invalid"),
    body("role").notEmpty().withMessage("Role is required"),
    body("password")
        .isLength({ min: 5 }).withMessage("Password must be more than 5 characters")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/).withMessage("Password must be alphanumeric")
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation Errors:", errors.array());
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { email, password, role } = req.body;

        const admin = await Admin.findOne({ email, role });
        if (!admin) {
            return res.status(400).json({ success: false, error: "Admin does not exist. Please sign up first." });
        }
        console.log("Admin found:", admin);
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Email or Password is incorrect" });
        }

        const token = jwt.sign(
            {   
                name: admin.name,
                email: admin.email,
                adminId: admin._id,
                role: admin.role,
                isLoggedIn: true,
            },
            process.env.session_secret_key,
            { expiresIn: '1d' }
        );

        console.log("Admin ID =", admin._id);
        return res.status(200).json({ success: true, token, adminId: admin._id, adminName: admin.name, email: admin.email });

    } catch (e) {
        console.error("Login Error:", e.message);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

module.exports = {login,signup};
