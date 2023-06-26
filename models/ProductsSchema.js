const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title:{
        type: String,
        unique: true,
        required: true,
    },
    price:{
        type: String,
        unique: true,
        required: true,
    },
    cardImage:{
        type: String,
        unique: true,
    }
})

const ProductModal = mongoose.model("products", ProductSchema);

module.exports = ProductModal;