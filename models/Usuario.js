const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  pontos: Number,
  reputacao: Number
}, { timestamps: true });


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
