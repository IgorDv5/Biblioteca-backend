const express = require("express");
const router = express.Router();
const livroController = require("../controllers/livroController");

router.get("/", livroController.listar);
router.get("/:id", livroController.buscarPorId);
router.post("/", livroController.criar);
router.put("/:id", livroController.atualizar);
router.delete("/:id", livroController.deletar);

router.post("/:id/emprestar", livroController.emprestar);
router.post("/:id/devolver", livroController.devolver);
router.get("/emprestados/:usuarioId", livroController.getEmprestados);

module.exports = router;
