const mongoose = require('mongoose');
const config = require('../config/database');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    }
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.addProduct = function(newProduct, callback){
    newProduct.save(callback);
};

module.exports.getProductById = function(productid, callback){
    Product.findById(productid, callback);
};

module.exports.getProductByName = function(name, callback){
    const query = {
        name: name
    }
    Product.findOne(query, callback);
};

module.exports.deleteProduct = function(productid, callback){
    Product.remove({_id: productid}, callback);
} ;

module.exports.updateProduct = function(productid, updatedProduct, callback){
    Product.update({_id: productid},updatedProduct, callback);
} ;