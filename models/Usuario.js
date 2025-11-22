const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  nome: String,
  email: { type: String, unique: true },
  senha: String,
  pontos: { type: Number, default: 50 },
  reputacao: { type: Number, default: 100 }
}, { timestamps: true });

UserSchema.pre("save", async function(next) {
  if (!this.isModified("senha")) return next();
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
  next();
});

UserSchema.methods.verificarSenha = async function(senhaDigitada) {
  return await bcrypt.compare(senhaDigitada, this.senha);
};

UserSchema.set("toJSON", {
  transform: (_, obj) => {
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
  }
});

UserSchema.set("toObject", {
  transform: (_, obj) => {
    delete obj.__v;
    delete obj.createdAt;
    delete obj.updatedAt;
    return obj;
  }
});

module.exports = mongoose.model("User", UserSchema);