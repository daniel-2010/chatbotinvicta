const mongoose = require("mongoose");
const additionalModel = require("../models/additional");
const bordersModel = require("../models/borders");

const itensSchema = mongoose.Schema({
  id: { type: String },
  id_sale: {type: new mongoose.Types.ObjectId, required:true},
  nome_item: { type: String, required: true },
  tipo_item: { type: String},
  preco_item: { type: Number},
  qtd_item: { type: Number},
  obs_item: { type: String},
  borda_item: { type:  bordersModel},
  adicionais_item: { type: String},
});

module.exports = mongoose.model("itens", itensSchema);
