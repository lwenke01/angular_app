'use strict';

const express = require('express');
const jwtAuth = require(__dirname + '/../lib/jwt-auth');
const jsonParser = require('body-parser').json();
const Resume = require(__dirname + '/../models/resume');
const handleDBError = require(__dirname + '/../lib/handle-db-error');

const resumeRouter = module.exports = exports = express.Router();

resumeRouter.get('/resumes', jwtAuth, (req, res)=>{
  Resume.find({}, (err, data)=>{
    if(err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

resumeRouter.post('/resumes', jsonParser, jwtAuth, (req,res)=>{
  var newResume = new Resume(req.body);
  newResume.save((err, data)=>{
    if(err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

resumeRouter.put('/resumes/:id', jsonParser, jwtAuth, (req, res)=>{
  var ResumeData = req.body;
  delete ResumeData._id;
  Resume.update({_id: req.params.id}, ResumeData, (err)=>{
    if(err) return handleDBError(err, res);

    res.status(200).json({msg: 'success'});
  });
});

resumeRouter.delete('/resumes/:id', jwtAuth, (req, res)=>{
  Resume.remove({_id: req.params.id}, (err)=>{
    if(err) return handleDBError(err, res);

    res.status(200).json({msg: 'success'});
  });
});
