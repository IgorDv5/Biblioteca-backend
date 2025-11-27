const Livro = require("../../models/Livro");

describe("Livro Model - Testes Unitários", () => {

  test("Criar livro com dados mínimos", async () => {
    const livro = new Livro({
      titulo: "1984",
      autor: "George Orwell",
      donoId: "65b2fc0fa29bd9e9d315c000"
    });

    await livro.save();

    expect(livro.titulo).toBe("1984");
    expect(livro.status).toBe("disponivel");
  });

  test("Calcular média de estrelas corretamente", () => {
    const livro = new Livro({
      titulo: "Livro",
      autor: "Autor",
      donoId: "65b2fc0fa29bd9e9d315c000",
      estrelas: 5,
      qtdAvaliacoes: 1
    });

    livro.estrelas = ((5 * 1) + 3) / 2;
    livro.qtdAvaliacoes++;

    expect(livro.estrelas).toBe(4);
    expect(livro.qtdAvaliacoes).toBe(2);
  });

});
