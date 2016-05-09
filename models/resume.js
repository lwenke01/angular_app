'use strict';

const mongoose = require('mongoose');


const resumeSchema = new mongoose.Schema({
    company: String,
    title: String,
    description: String,
    dates: String

});



module.exports = exports = mongoose.model('Resume', resumeSchema);
