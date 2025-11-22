const Livro = require("../models/Livro");


exports.listar = async (req, res) => {
  try {
    const livros = await Livro.find();
    res.json(livros);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar livros" });
  }
};


exports.buscarPorId = async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);

    if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });

    res.json(livro);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar livro" });
  }
};


exports.criar = async (req, res) => {
  try {
    const novoLivro = await Livro.create(req.body);
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao cadastrar livro" });
  }
};


exports.atualizar = async (req, res) => {
  try {
    const atualizado = await Livro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!atualizado)
      return res.status(404).json({ erro: "Livro não encontrado" });

    res.json(atualizado);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao atualizar livro" });
  }
};


exports.deletar = async (req, res) => {
  try {
    const removido = await Livro.findByIdAndDelete(req.params.id);

    if (!removido)
      return res.status(404).json({ erro: "Livro não encontrado" });

    res.json({ mensagem: "Livro removido com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao deletar livro" });
  }
};
