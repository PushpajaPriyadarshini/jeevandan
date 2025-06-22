const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "PushpajaSecret";

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const admin = new Admin({ name, email, password: hashed });
    await admin.save();
    res.status(201).json({ message: "Admin created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ adminId: admin._id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, name: admin.name });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});


module.exports = router;
