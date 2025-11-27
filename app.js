const express = require("express");
const cors = require("cors");
const conectarBanco = require("./config/database");
const livroRoutes = require("./routes/livroRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:4000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

// conectar banco
conectarBanco();

// rotas
app.use("/livros", livroRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/auth", authRoutes);

module.exports = app; // 👈 IMPORTANTE PRO JEST
