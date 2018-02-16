const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Product = require('../modules/product');
const Productdetail = require('../modules/productdetail');
const Booking = require('../modules/booking');

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
            Product.find(function(err, product){
                if(err) throw err;
                res.json({success: true, msg: 'Product deleted successfully', data: product});
            });
            
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
//<-- Productdetails part start --------------------------------------------------------->
// Add new product details
router.post('/productdetail', (req, res, next) => {
    let newProductdetail = new Productdetail({
        productid: req.body.productid,
        name: req.body.name,
        make: req.body.make,
        model: req.body.model,
        registnum: req.body.registnum,
        nameofsupplier: req.body.nameofsupplier,
        date: req.body.date,
        condition: req.body.condition,
        remark: req.body.remark
    });
    //res.json(newProductdetail);
    Productdetail.addProductdetail(newProductdetail, (err, productdetail) => {
        if(err){
            res.json({success: false, msg: 'Failed to add Product'});
        }else{
            res.json({success: true, msg: 'Product Add', data: productdetail});
        }
    }); 
});
// get all product details
router.get('/productdetails', (req, res, next) => {
    Productdetail.getAllProductdetails((err, productdetail) => {
        if(err) throw err;
        res.json({success: true, data: productdetail});
    });
});
// get product details based on productid
router.get('/productdetails/:productid', (req, res, next) => {
    Productdetail.getProductdetailByProductid(req.params.productid, (err, productdetail) => {
        res.json({success: true, data: productdetail});
    });
});
// Delete product
router.delete('/productdetail/:productdetailid', (req, res, next) => {
    Productdetail.deleteProductdetail(req.params.productdetailid, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to delete Product detail'});
        }else{
            res.json({success: true, msg: 'Product detail deleted successfully'});
        }
    });
});
// Update product
router.put('/productdetail/:productdetailid', (req, res, next) => {
    let updatedProductdetail = {
        productid: req.body.productid,
        name: req.body.name,
        make: req.body.make,
        model: req.body.model,
        registnum: req.body.registnum,
        nameofsupplier: req.body.nameofsupplier,
        date: req.body.date,
        condition: req.body.condition,
        remark: req.body.remark
    }; 
    Productdetail.updateProductdetail(req.params.productdetailid, updatedProductdetail, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to Update Product detail'});
        }else{
            res.json({success: true, msg: 'Product detail Updated successfully'});
        }
    });
});
//<-- Productdetails part end --------------------------------------------------------->
//<-- Bookings part start --------------------------------------------------------->
// Add new Booking
router.post('/booking', (req, res, next) => {
    let newBooking = new Booking({
        productdetailid: req.body.productdetailid,
        fromdate: req.body.fromdate,
        todate: req.body.todate,
        location: req.body.location,
        status: req.body.status,
        uid: req.body.uid
    });
    Booking.addBooking(newBooking, (err, booking) => {
        if(err){
            res.json({success: false, msg: 'Failed to add Booking'});
        }else{
            res.json({success: true, msg: 'Booking Add', data: booking});
        }
    }); 
});
// get booking based on status
router.get('/bookings/:status', (req, res, next) => {
    Booking.getBookingByStatus(req.params.status, (err, booking) => {
        res.json({success: true, data: booking});
    });
});
// Delete booking
router.delete('/booking/:bookingid', (req, res, next) => {
    Booking.deleteBooking(req.params.bookingid, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to delete Booking'});
        }else{
            res.json({success: true, msg: 'Booking deleted successfully'});
        }
    });
});
// Update booking
router.put('/booking/:bookingid', (req, res, next) => {
    let updatedBooking = {
        productdetailid: req.body.productdetailid,
        fromdate: req.body.fromdate,
        todate: req.body.todate,
        location: req.body.location,
        status: req.body.status,
        uid: req.body.uid,
        updatedon: req.body.updatedon
    }; 
    Booking.updateProductdetail(req.params.bookingid, updatedBooking, (err, result) => {
        if(err){
            res.json({success: false, msg: 'Failed to Update Booking'});
        }else{
            res.json({success: true, msg: 'Booking Updated successfully'});
        }
    });
});
//<-- Booking part end --------------------------------------------------------->
module.exports = router;