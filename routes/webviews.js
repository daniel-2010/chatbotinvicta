
var express = require('express');

const mongoose = require("mongoose");
const UserMongoose = require("../models/user");
const produtcModel = require("../models/product"); 1
const additionalModel = require("../models/additional");
const bordersModel = require("../models/borders");
const salesModel = require("../models/sales");
const itensModel = require("../models/itens");


var router = express.Router();

var products = [];

const fbservice = require('../fb-service/fb-service');
router.get('/', function (req, res) {

  UserMongoose.find({ "p": req.query.psid }, function (err, doc) {
    if (err) {
      console.log("Erro on findOne: " + err);
      this.products = doc;
    }
  });
  res.render('../views/cardapio', this.products);
});


router.get('/get_products/', function (req, res) {
  let json = {};
  produtcModel.find({ "status_product": "ativo" }, function (err, doc) {
    if (!err) {
      json.products = doc;
      additionalModel.find({ "status_additional": "ativo" }, function (err, doc) {
        if (!err) {
          json.additionals = doc;
          bordersModel.find({ "status_border": "ativo" }, function (err, doc) {
            if (!err) {
              json.borders = doc;
              res.json(json);
            } else { console.log("Erro on find products: " + err); res.json([]); }
          });
        } else { console.log("Erro on find products: " + err); res.json([]); }
      });
    } else { console.log("Erro on find products: " + err); res.json([]); }
  });

});

router.get('/save', function (req, res) {
  let body = req.query;
  let itens = body.products;
  let response = `Pedido enviado com sucesso. Em qual endereço podemos enviar seu pedido?`;
  let borderBanco = {};
  let borda_item = {};

  let mSale = new salesModel({
    fb_id_user: body.psid,
    endereco_sale: " ",
    valor_total_sale: 0
  });
  mSale.save(function (err, sale) {

    if (err) {
      console.log(err)
    } else {

      itens.forEach(function (cod_item) {

        produtcModel.findOne({ "_id": cod_item }, function (err, doc) {

          if (body['product_' + doc._id + '_borda'].length > 0) {
            get_border_by_id(body['product_' + doc._id + '_borda'], function(err, border) {
              if (err) {console.log(err);}
              this.borderBanco = border;
              console.log("####>>> 1 Nome borda: " + this.borderBanco.nome_border);
            });

            console.log("####>>> 2 Nome borda: " + this.borderBanco.nome_border);
            borda_item = { 'nome_border': this.borderBanco.nome_border, 'preco_border': borderBanco.preco_border };
          }

          let mitem = new itensModel({
            id_sale: sale._id,
            nome_item: doc.nome_product,
            tipo_item: doc.tipo_product,
            preco_item: doc.preco_product,
            qtd_item: body['product_' + doc._id + '_qtd'],
            obs_item: body['product_' + doc._id + '_obs'],
            borda_item: borda_item,
            adicionais_item: ''
          });
          mitem.save().then();

        });
      });
      console.log(sale._id);
    }
  });

  fbservice.sendTextMessage(body.psid, response);
});

router.get('/settings', function (req, res) {

  UserMongoose.findOne({ "fb_id": req.query.psid }, function (err, doc) {
    if (err) {
      console.log("Erro on findOne: " + err);
      res.json([]);
    } else {
      res.json(doc);
      console.log("====DOC: " + doc);
    }
  });
});

function get_border_by_id(id, callback) {
  bordersModel.find({ "_id": id}, function(err, borders) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, borders[0]);
    }
  });
};

module.exports = router;

