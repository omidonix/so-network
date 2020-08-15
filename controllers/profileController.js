const db = require('../models/index')
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');



module.exports.chat = async function(req,res,next){

  var self_user = req.user

  if(!self_user){
    self_user = await db.users.findByPk(22)
  }
  console.log(self_user,'omiiiiiiidddd')
  var users = await db.users.findAll({
    where: {
      id:{
        [Op.not] : self_user.id
      }
    }
  })
  res.render('pages/profile_chat',{
    self_user,
    users
  });
}