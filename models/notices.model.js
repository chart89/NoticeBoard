const mongoose = require('mongoose');

const noticesSchema = new mongoose.Schema({
    author: { type: String }
  });

  module.exports = mongoose.model('Notice', noticesSchema);