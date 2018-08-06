
var express = require('express');

const mongoose = require("mongoose");
const UserMongoose = require("../models/user");
const produtcModel = require("../models/product"); 1
const additionalModel = require("../models/additional");
const bordersModel = require("../models/borders");


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
    } else {console.log("Erro on find products: " + err); res.json([]);}    
  });
  additionalModel.find({ "status_additional": "ativo" }, function (err, doc) {
    if (!err) {
      json.additionals = doc;
    } else {console.log("Erro on find products: " + err); res.json([]);}    
  });
  bordersModel.find({ "status_border": "ativo" }, function (err, doc) {
    if (!err) {
      json.borders = doc;
    } else {console.log("Erro on find products: " + err); res.json([]);}    
  });
  res.json(json);
});

router.get('/save', function (req, res) {
  let body = req.query;
  let topics = body.topics.join(',');
  let response = `Settings saved!`;

  UserMongoose.update({ fb_id: body.psid },
    { $set: { newsletter: body.newsletter, topics: topics, deals: body.deals } },
    function (err, count) {
      if (err) {
        console.log('===> Erro ao atualizar Newsletter: ' + err);
      } else {
        console.log('===> Newsletter  atualizado com sucesso! Conut:' + count);
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

module.exports = router;

