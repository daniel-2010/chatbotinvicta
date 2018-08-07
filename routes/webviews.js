
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

          let mitem = new itensModel({
            id_sale: sale._id,
            nome_item: doc.nome_product,
            tipo_item: doc.tipo_product,
            preco_item: doc.preco_product,
            qtd_item: body['product_' + doc._id + '_qtd'],
            obs_item: body['product_' + doc._id + '_obs']
          });

          if (body['product_' + doc._id + '_borda'].length > 0) {
            bordersModel.findOne({ "_id": body['product_' + doc._id + '_borda'] }).exec()
              .then(function (doc1) {
                if (body['product_' + doc._id + '_borda'].length > 0) {
                  additionalModel.find({ "_id": { $in: body['product_' + doc._id + '_adicionais'] } }, function (err, doc2) {
                    mitem.adicionais_item = doc2;
                    mitem.borda_item = doc1;
                    mitem.save().then();
                  });
                } else {
                  mitem.borda_item = doc1;
                  mitem.save().then();
                }
              })
          } else {
            mitem.save().then();

          }
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


function get_border_by_id(id) {
  bordersModel.findOne({ "_id": id }).exec()
    .then(function (doc1) {
      return doc1;
    });
}

module.exports = router;

