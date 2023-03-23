const mongoose = require('mongoose');
const productschema = new mongoose.Schema({
    name: String,
    price: Number,
    seller: String,
    instock: String,
});

const product = mongoose.model('product', productschema);
module.exports = product;