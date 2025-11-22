const Livro = require("../models/Livro");
const User = require("../models/Usuario");


/*
Usuario que empresta ganha 20 pontos;
Usuario que pega emprestado perde 10 pontos; ganha 15 ao devolver
*/



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


exports.emprestar = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuarioId, dias } = req.body;

    if (!usuarioId || !dias) {
      return res.status(400).json({ erro: "usuarioId e dias são obrigatórios" });
    }

    const livro = await Livro.findById(id);
    if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });

    if (livro.status === "emprestado") {
      return res.status(400).json({ erro: "Livro já está emprestado" });
    }

    const pegador = await User.findById(usuarioId);
    if (!pegador) return res.status(404).json({ erro: "Usuário não encontrado" });

    // Reputação mínima para pegar livro
    if ((pegador.reputacao || 100) < 50) { //reputacao minima: 50
      return res.status(400).json({ erro: "Usuário com baixa reputação não pode pegar livros" });
    }

    // Pontos mínimos para pegar livro
    if ((pegador.pontos || 0) < 10) { // pontos minimos: 10
      return res.status(400).json({ erro: "Usuário não tem pontos suficientes para pegar este livro" });
    }

    // Definição de datas
    const hoje = new Date();
    const dataDevolucao = new Date();
    dataDevolucao.setDate(dataDevolucao.getDate() + Number(dias));

    // Atualizando livro
    livro.status = "emprestado";
    livro.emprestadoPara = usuarioId;
    livro.dataEmprestimo = hoje;
    livro.dataDevolucaoPrevista = dataDevolucao;
    await livro.save();

    // Atualizando pontos
    const dono = await User.findById(livro.donoId);
    if (dono) {
      dono.pontos = (dono.pontos || 0) + 20; // dono ganha 20 pontos
      await dono.save();
    }

    pegador.pontos = (pegador.pontos || 0) - 10; // pegador perde 10 pontos
    await pegador.save();

    res.json({ mensagem: "Livro emprestado com sucesso", livro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: "Erro ao emprestar livro" });
  }
};

exports.devolver = async (req, res) => {
  try {
    const { id } = req.params;

    const livro = await Livro.findById(id);
    if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });

    if (livro.status !== "emprestado")
      return res.status(400).json({ erro: "Livro não está emprestado" });

    const pegador = await User.findById(livro.emprestadoPara);

    const hoje = new Date();

    if (pegador) {
      // Quem devolve ganha pontos
      pegador.pontos = (pegador.pontos || 0) + 15; //pegador ganha 15 pontos ao devolver

      // Perde reputação se atrasar devolucao
      if (livro.dataDevolucaoPrevista && hoje > new Date(livro.dataDevolucaoPrevista)) {
        pegador.reputacao = Math.max((pegador.reputacao || 100) - 10, 0);
      }

      await pegador.save();
    }

    // Atualizando status do livro
    livro.status = "disponivel";
    livro.emprestadoPara = null;
    livro.dataEmprestimo = null;
    livro.dataDevolucaoPrevista = null;

    await livro.save();

    res.json({
      mensagem: "Livro devolvido com sucesso",
      livro,
      pegador
    });
  } catch (error) {
    console.error("Erro devolver:", error);
    res.status(500).json({ erro: "Erro ao devolver livro" });
  }
};
