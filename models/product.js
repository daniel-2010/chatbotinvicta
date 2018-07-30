const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  id: { type: String },
  nome_product: { type: String, required: true },
  receita_product: { type: String },
  tipo_product: { type: String},
  preco_product: { type: Number},
  data_cadastro_product: { type: Date, default: Date.now },
  status_product: {type: String, default: 'ativo'}
});

module.exports = mongoose.model("product", productSchema);
