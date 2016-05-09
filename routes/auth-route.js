'use strict';

const express = require('express');
const User = require(__dirname + '/../models/user');
const jsonParser = require('body-parser').json();
const handleDBError = require(__dirname + '/../lib/handle-db-error');
const basicHttp = require(__dirname + '/../lib/basic-http');

var authRouter = module.exports = exports = express.Router();

authRouter.post('/signup', jsonParser, (req, res)=>{
  var newUser = new User();
  newUser.username = req.body.username || req.body.email;
  newUser.authentication.email = req.body.email;
  newUser.hashPassword(req.body.password);
  newUser.save((err, data)=>{
    if (err) return handleDBError(err, res);
    res.status(200).json({token: data.generateToken()});
  });
});

authRouter.get('/signin', basicHttp, (req, res)=>{
  User.findOne({'authentication.email': req.basicHttp.email}, (err, user)=>{
    if(err){
      console.log(err);
      return res.status(401).json({msg: 'cannot auth'});
    }
    if(!user) return res.status(401).json({msg: 'cannot auth user'});

    if(!user.comparePassword(req.basicHttp.password)) return res.status(401).json({msg: 'cannot auth password'});

    res.json({token: user.generateToken()});
  });
});
