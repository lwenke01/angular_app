'use strict';

const mongoose = require('mongoose');


projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  created: String,
  course: String
});



module.exports = exports = mongoose.model('Project', projectSchema);
