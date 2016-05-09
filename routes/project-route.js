'use strict';

const express = require('express');
const jwtAuth = require(__dirname + '/../lib/jwt-auth');
const jsonParser = require('body-parser').json();
const Project = require(__dirname + '/../models/project');
const handleDBError = require(__dirname + '/../lib/handle-db-error');

const projectRouter = module.exports = exports = express.Router();

projectRouter.get('/projects', jwtAuth, (req, res)=>{
  Project.find({}, (err, data)=>{
    if(err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

projectRouter.post('/projects', jsonParser, jwtAuth, (req,res)=>{
  var newProject = new Project(req.body);
  newPorject.save((err, data)=>{
    if(err) return handleDBError(err, res);

    res.status(200).json(data);
  });
});

projectRouter.put('/projects/:id', jsonParser, jwtAuth, (req, res)=>{
  var ProjectData = req.body;
  delete ProjectData._id;
  Project.update({_id: req.params.id}, ProjectData, (err)=>{
    if(err) return handleDBError(err, res);

    res.status(200).json({msg: 'success'});
  });
});

projectRouter.delete('/projects/:id', jwtAuth, (req, res)=>{
  Project.remove({_id: req.params.id}, (err)=>{
    if(err) return handleDBError(err, res);

    res.status(200).json({msg: 'success'});
  });
});
