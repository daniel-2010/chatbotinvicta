const mongoose = require("mongoose");

const itensSchema = mongoose.Schema({
  id: { type: String },
  id_sale: {type: ObjectId, required:true},
  nome_item: { type: String, required: true },
  tipo_item: { type: String},
  preco_item: { type: Number},
  qtd_item: { type: Number},
  obs_item: { type: String},
  borda_item: { type: String},
  adicionais_item: { type: String},
});

module.exports = mongoose.model("itens", itensSchema);
