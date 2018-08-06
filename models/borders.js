const mongoose = require("mongoose");

const borderSchema = mongoose.Schema({
  id: { type: String },
  nome_border: { type: String, required: true },
  tipo_border: { type: String},
  preco_border: { type: Number},
  data_cadastro_border: { type: Date, default: Date.now },
  status_border: {type: String, default: 'ativo'}
});

module.exports = mongoose.model("border", borderSchema);
