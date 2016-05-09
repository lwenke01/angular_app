'use strict';

const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  created: String,
  course: String
});



module.exports = exports = mongoose.model('Project', projectSchema);
