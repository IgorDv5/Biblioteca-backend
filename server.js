const express = require("express");
const cors = require("cors");
const conectarBanco = require("./config/database");
const livroRoutes = require("./routes/livroRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");


const app = express();
const authRoutes = require("./routes/authRoutes");

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




// porta
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
