'use strict';

const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/my_app_dev');

app.use((req, res, next)=>{
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

const authRouter = require(__dirname + '/routes/auth-route');
const userRouter = require(__dirname + '/routes/user-route');
// const resumeRouter = require(__dirname + '/routes/resume-route');
const projectRouter = require(__dirname + '/routes/project-route');

app.use('/',authRouter);
app.use('/',userRouter);
// app.use('/',resumeRouter);
app.use('/', projectRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('server is up on ' + PORT));
