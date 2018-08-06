const mongoose = require("mongoose");

const salesSchema = mongoose.Schema({
  id: { type: String },
  fb_id_user: {type: String, required:true},
  endereco_sale: { type: String, required: true },
  valor_total_sale: { type: Number},
  data_cadastro_sale: { type: Date, default: Date.now },
  status_sale: {type: String, default: 'enviado'}
});

module.exports = mongoose.model("sales", salesSchema);
