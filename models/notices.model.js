const mongoose = require('mongoose');

const noticesSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 10, maxlength: 50 },
    content: { type: String, required: true, minlength: 20, maxlength: 1000 },
    date: { type: String, required: true },
    price: { type: Number, required: true },
    localization: { type: String, required: true, minlength: 4, maxlength: 50 },
    picture: { type: String, required: true },
    saler: {type: Object, required: true, ref: 'User'}
  });

  module.exports = mongoose.model('Notice', noticesSchema);