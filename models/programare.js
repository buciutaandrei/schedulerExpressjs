const mongoose = require("mongoose");

const programareSchema = new mongoose.Schema({
  pacient: {
    type: String,
    unique: true
  }
});

const Programare = mongoose.model("Programare", programareSchema);
module.exports = Programare;
