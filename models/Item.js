const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    photo: String,
    price: {
        type: Number,
        required: true
    }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
