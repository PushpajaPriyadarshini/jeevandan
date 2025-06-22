const express = require("express");
const Donor = require("../models/Donor");

const router = express.Router();

// POST: Register donor
router.post("/", async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.status(201).json({ message: "Donor registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET: All donors
router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find().sort({ date: -1 });
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
