
var express = require('express');

const mongoose = require("mongoose");
const UserMongoose = require("../models/user");


var router = express.Router();


const fbservice = require('../fb-service/fb-service');
router.get('/', function(req, res) {
  //res.send('Birds home page');
  res.render('../views/newsletter-settings');
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
      if(err){console.log("Erro on findOne: "+err);}
      if (doc.length > 0){
        res.json(doc);
        console.log("====DOC: "+doc);
      }else{
        console.log('====No doc==== psid:'+req.query.psid+doc);
        res.json([]);
      }
  });
});

module.exports = router;

