const mongoose = require('mongoose');

const LivroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  donoId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['disponivel','emprestado'], default: 'disponivel' },
  emprestadoPara: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  estrelas: { type: Number, min: 1, max: 5, default: 5 },
  qtdAvaliacoes: { type: Number, default: 0 }, 
  dataEmprestimo: Date,
  dataDevolucaoPrevista: Date
}, { timestamps: true });

// Método para formatar datas
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