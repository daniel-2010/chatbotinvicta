'use strict';
const UserMongoose = require("../models/user");

module.exports = {

    saveNewUser: function(userId,person,res){
        UserMongoose.findOne({"fb_id": userId}, function(err,doc) {
            if(err)
             console.log("Erro on findOne: "+err);
            if (!doc){
                person.save().then(createdPost => {
                    console.log("User added successfully from module");
                });
            }
           }
      );
    }

}