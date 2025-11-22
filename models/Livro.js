const mongoose = require("mongoose");

const LivroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  ano: Number
});

module.exports = mongoose.model("Livro", LivroSchema);
