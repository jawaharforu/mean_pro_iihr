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

module.exports.getProductdetailById = function(productid, callback){
    Productdetail.findById(productid, callback);
};

module.exports.getProductdetailAndProductById = function(productdetailid, callback){
   Productdetail.aggregate([
       { $match:
            {
                '_id': mongoose.Types.ObjectId(productdetailid)
            }
       },
       { $lookup:
        {
          from: 'products',
          localField: 'productid',
          foreignField: '_id',
          as: 'productname'
        }
      }
   ], callback);
}

module.exports.getProductdetailByProductid = function(productid, callback){
    /*
    const query = {
        productid: productid
    }
    Productdetail.find(query, callback);
    */
    Productdetail.aggregate([
        { $match:
            {
                'productid': mongoose.Types.ObjectId(productid)
            }
        },
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

module.exports.getProductBookingList = function(callback){
    Productdetail.aggregate([
        { $lookup:
            {
              from: 'products',
              localField: 'productid',
              foreignField: '_id', 
              as: 'productname'
            }
        },
        { $lookup:
           {
             from: 'bookings',
             localField: '_id',
             foreignField: 'productdetailid', 
             as: 'bookedlist'
           }
         },
         { $match:
            {
                $and: [ 
                    {'condition': {$in: ["working"]}}
                ]
            }
         },
        ],callback);
} ;

module.exports.getProductBookedList = function(callback){
    Productdetail.aggregate([
        { $lookup:
           {
             from: 'bookings',
             localField: '_id',
             foreignField: 'productdetailid', 
             as: 'bookedlist'
           }
         },
         { $match:
            {
                $and: [ 
                    {'bookedlist.status': {$in: ["Pending","Approved"]}}, 
                    {'bookedlist.todate': {$gt : new Date()}}
                ]
            }
         },
         { $project: 
            {
                '_id': 1
            }
        }
        ],callback);
} ;

module.exports.getProductBookingLists = function(callback) {
    Productdetail.aggregate([
         {
            $project:
              {
                "has bananas" : {
                    $in: [ "$_id", [mongoose.Types.ObjectId("5a8a99a20cfc3e11ecf1088f")] ]
                  }
              }
         }
        ],callback);
}
