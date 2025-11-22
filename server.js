const express = require("express");
const cors = require("cors");
const conectarBanco = require("./config/database");
const livroRoutes = require("./routes/livroRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");


const app = express();

app.use(express.json());
app.use(cors());

// conectar banco
conectarBanco();

// rotas
app.use("/livros", livroRoutes);
app.use("/usuarios", usuarioRoutes);



// porta
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
