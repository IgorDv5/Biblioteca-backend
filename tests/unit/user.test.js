const User = require("../../models/Usuario");

describe("User Model - Testes Unitários", () => {

  test("Hash da senha deve ser gerado corretamente", async () => {
    const user = new User({
      nome: "Teste",
      email: "teste@gmail.com",
      senha: "123456"
    });

    await user.save();

    const senhaOk = await user.verificarSenha("123456");
    expect(senhaOk).toBe(true);
  });

  test("verificarSenha deve retornar false com senha errada", async () => {
    const user = new User({
      nome: "Igor",
      email: "igor@gmail.com",
      senha: "senha123"
    });

    await user.save();

    const senhaErrada = await user.verificarSenha("errada");
    expect(senhaErrada).toBe(false);
  });
});
