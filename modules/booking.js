const mongoose = require('mongoose');
const config = require('../config/database');
const Product = require('./product');
const Productdetail = require('./productdetail');
const BookingSchema = mongoose.Schema({
    productdetailid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Productdetail',
        required: [true,'No product id found']
    },
    fromdate: {
        type: Date
    },
    todate: {
        type: Date
    },
    location: {
        type: String
    },
    status: {
        type: String
    },
    uid: {
        type: Number
    },
    username: {
        type: String
    },
    createdon: {
        type: Date,
        default: Date.now
    },
    updatedon: {
        type: Date,
        default: Date.now
    }
});


const Booking = module.exports = mongoose.model('Booking', BookingSchema);

module.exports.addBooking = function(newBooking, callback){
    newBooking.save(callback);
};

module.exports.getBookingById = function(bookingid, callback){
    Booking.findById(bookingid, callback);
};

module.exports.getBookingByStatus = function(status, callback){
    /*
    const query = {
        status: status
    }
    Booking.find(query, callback);
    */
    Booking.aggregate([
        { $match:
            {
                'status': status
            }
        },
        { $lookup:
           {
             from: 'productdetails',
             localField: 'productdetailid',
             foreignField: '_id',
             as: 'productdetail'
           }
         },
         { $lookup :
            {
                from: 'products',
                localField: 'productdetail.productid',
                foreignField: '_id',
                as : 'product'
            }
         }
        ],callback);
}; 

module.exports.getBookingByUid = function(uid, callback){
    Booking.aggregate([
        { $match:
            {
                'uid': Number(uid)
            }
        },
        { $lookup:
           {
             from: 'productdetails',
             localField: 'productdetailid',
             foreignField: '_id',
             as: 'productdetail'
           }
         },
         { $lookup :
            {
                from: 'products',
                localField: 'productdetail.productid',
                foreignField: '_id',
                as : 'product'
            }
         }
        ],callback);
}; 

module.exports.getAllBookedlist = function(callback){
    Booking.aggregate([
        { $lookup:
           {
             from: 'productdetails',
             localField: 'productdetailid',
             foreignField: '_id',
             as: 'productdetail'
           }
         },
         { $lookup :
            {
                from: 'products',
                localField: 'productdetail.productid',
                foreignField: '_id',
                as : 'product'
            }
         }
        ],callback);
};

module.exports.deleteBooking = function(bookingid, callback){
    Booking.remove({_id: bookingid}, callback);
} ;

module.exports.updateBooking = function(bookingid, updatedBooking, callback){
    Booking.update({_id: bookingid},updatedBooking, callback);
} ;