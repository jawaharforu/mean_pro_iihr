const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Product = require('../modules/product');

// Login routing
router.get('/login', (req, res, next) => {
    res.send('login');
});
//<-- Product part start --------------------------------------------------------->
// Get all products
router.get('/products', (req, res, next) => {
    Product.find(function(err, product){
        if(err) throw err;
        res.json({success: true, data: product});
    });
});
// Get one products
router.get('/product/:productid', (req, res, next) => {
    Product.getProductById(req.params.productid, (err, product) => {
        if(err){
            res.json({success: false, msg: 'Some Error'});
        }else{
            res.json({success: true, data: product});
        }
    });
});
// Add products
router.post('/product', (req, res, next) => {
    let newProduct = new Product({
        name: req.body.name
    }); 
    Product.addProduct(newProduct, (err, product) => {
        if(err){
            res.json({success: false, msg: 'Failed to add Product'});
        }else{
            res.json({success: true, msg: 'Product Add', data: product});
        }
    });
});
// Delete product
router.delete('/product/:productid', (req, res, next) => {
    Product.deleteProduct(req.params.productid, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to delete Product'});
        }else{
            res.json({success: true, msg: 'Product deleted successfully'});
        }
    });
});
// Update product
router.put('/product/:productid', (req, res, next) => {
    let updatedProduct = {
        name: req.body.name
    }; 
    Product.updateProduct(req.params.productid, updatedProduct, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to Update Product'});
        }else{
            res.json({success: true, msg: 'Product Updated successfully'});
        }
    });
});
//<-- Product part end --------------------------------------------------------->

module.exports = router;