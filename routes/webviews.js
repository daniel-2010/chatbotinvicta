
var express = require('express');

const mongoose = require("mongoose");
const UserMongoose = require("../models/user");
const produtcModel = require("../models/product");


var router = express.Router();

var products = [];

const fbservice = require('../fb-service/fb-service');
router.get('/get_products/', function(req, res) {

  produtcModel.find({"status": "ativo"}, function(err,doc) {
    if(err){
      console.log("Erro on find products: "+err);
      this.products = doc;
    }
  });
  res.json(this.products);
});

router.get('/save',function(req,res){
  let body = req.query;
  let topics = body.topics.join(',');
  let response = `Settings saved!`;
  
  UserMongoose.update({ fb_id:body.psid},
    {$set: { newsletter:body.newsletter,topics:topics,deals:body.deals} },
    function(err, count) {
           if (err){
            console.log('===> Erro ao atualizar Newsletter: '+err);
           }else{
            console.log('===> Newsletter  atualizado com sucesso! Conut:' + count);
           }
    });
  
  
  fbservice.sendTextMessage(body.psid,response);
});

router.get('/settings',function(req,res){

  UserMongoose.findOne({"fb_id": req.query.psid}, function(err,doc) {
      if(err){
        console.log("Erro on findOne: "+err);
        res.json([]);
      } else{
        res.json(doc);
        console.log("====DOC: "+doc);
      }
  });
});

module.exports = router;

