const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");


exports.listar = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-senha"); // Oculta a senha
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar usuários" });
  }
};


exports.buscarPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).select("-senha");
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar usuário" });
  }
};


exports.criar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;


    const senhaHash = await bcrypt.hash(senha, 10);

    const novo = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      pontos: 50,      
      reputacao: 100  
    });

    res.status(201).json({ mensagem: "Usuário criado", usuario: novo._id });

  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar usuário" });
  }
};


exports.atualizar = async (req, res) => {
  try {
    const dados = { ...req.body };

    if (dados.senha) {
      dados.senha = await bcrypt.hash(dados.senha, 10);
    }

    const atualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      dados,
      { new: true }
    ).select("-senha");

    if (!atualizado) return res.status(404).json({ erro: "Usuário não encontrado" });

    res.json(atualizado);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar usuário" });
  }
};


exports.deletar = async (req, res) => {
  try {
    const removido = await Usuario.findByIdAndDelete(req.params.id);

    if (!removido) return res.status(404).json({ erro: "Usuário não encontrado" });

    res.json({ mensagem: "Usuário removido" });

  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover usuário" });
  }
};
