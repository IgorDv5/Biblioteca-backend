// models/Livro.js
const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  donoId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['disponivel','emprestado'], default: 'disponivel' },
  emprestadoPara: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dataEmprestimo: Date,
  dataDevolucaoPrevista: Date
}, { timestamps: true });

// Metodo Para formatacao de data
function formatarData(date) {
  if (!date) return null;
  const d = new Date(date);
  return d.toLocaleDateString("pt-BR");
}

LivroSchema.set("toJSON", {
  transform: (_, obj) => {
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;

    if (obj.dataEmprestimo)
      obj.dataEmprestimo = formatarData(obj.dataEmprestimo);

    if (obj.dataDevolucaoPrevista)
      obj.dataDevolucaoPrevista = formatarData(obj.dataDevolucaoPrevista);

    return obj;
  },
});

module.exports = mongoose.model('Livro', LivroSchema);
