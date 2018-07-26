
var express = require('express');
var router = express.Router();
const fbservice = require('../fb-service/fb-service');
router.get('/', function(req, res) {
  //res.send('Birds home page');
  res.render('../views/newsletter-settings');
});

router.get('/save',function(req,res){
  let body = req.query;
  let topics = body.topics.join(',');
  let response = `Newsletter: ${body.newsletter}, topics: ${topics} and deals ${body.deals}`;
  
  fbservice.sendTextMessage(body.psid,response);
})

module.exports = router;

