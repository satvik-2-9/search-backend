const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:String
});

module.exports = mongoose.model('item', itemSchema); 