const User = require("../models/Usuario");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "";


exports.login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ erro: "Email e senha obrigatórios" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ erro: "Usuário não encontrado" });

    const senhaValida = await user.verificarSenha(senha);
    if (!senhaValida) return res.status(401).json({ erro: "Senha incorreta" });

    // Gerar token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      mensagem: "Login realizado com sucesso",
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        pontos: user.pontos,
        reputacao: user.reputacao
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
};
