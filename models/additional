const mongoose = require("mongoose");

const additionalSchema = mongoose.Schema({
  id: { type: String },
  nome_additional: { type: String, required: true },
  tipo_additional: { type: String},
  preco_additional: { type: Number},
  data_cadastro_additional: { type: Date, default: Date.now },
  status_additional: {type: String, default: 'ativo'}
});

module.exports = mongoose.model("additional", additionalSchema);
