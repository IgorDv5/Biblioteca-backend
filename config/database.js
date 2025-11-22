const mongoose = require("mongoose");

async function conectarBanco() {
  try {
    await mongoose.connect("mongodb://localhost:27017/biblioteca");
    console.log("MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
  }
}

module.exports = conectarBanco;
