const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  contact: String,
  organ: String,
  message: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Donor", donorSchema);
