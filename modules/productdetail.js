const mongoose = require('mongoose');
const config = require('../config/database');
const Product = require('./product');
const ProductdetailSchema = mongoose.Schema({
    productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true,'No product id found']
    },
    name: {
        type: String
    },
    make: {
        type: String
    },
    model: {
        type: String
    },
    registnum: {
        type: String
    },
    nameofsupplier: {
        type: String
    },
    date: {
        type: Date
    },
    condition: {
        type: String
    },
    remark: {
        type: String
    }
});


const Productdetail = module.exports = mongoose.model('Productdetail', ProductdetailSchema);

module.exports.addProductdetail = function(newProductdetail, callback){
    newProductdetail.save(callback);
};

module.exports.getProductdetailById = function(productdetailid, callback){
    Productdetail.findById(productid, callback);
};

module.exports.getProductdetailByProductid = function(productid, callback){
    const query = {
        productid: productid
    }
    Productdetail.find(query, callback);
}; 

module.exports.deleteProductdetail = function(productdetailid, callback){
    Productdetail.remove({_id: productdetailid}, callback);
} ;

module.exports.updateProductdetail = function(productdetailid, updatedProduct, callback){
    Productdetail.update({_id: productdetailid},updatedProduct, callback);
} ;

module.exports.getAllProductdetails = function(callback){
    Productdetail.aggregate([
        { $lookup:
           {
             from: 'products',
             localField: 'productid',
             foreignField: '_id',
             as: 'productname'
           }
         }
        ],callback);
};