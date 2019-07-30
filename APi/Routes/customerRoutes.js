let express = require("express"),
    mongoose = require("mongoose");

let productRoutes = express.Router();
var Cart=require('../Models/cart');
let productSchema = require("../Models/product.model");




// List products
productRoutes.get("/", (req, res) => {
    productSchema.find({}, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    });
});


productRoutes.get("/add-to-cart/:id", (req, res) => {
    var productId= req.params.id;
    //if i had acart in the session i pass it and if not i pass empty object 
    var cart =new Cart(req.session.cart ? req.session.cart : {items: {}});
  
    productSchema.findById(productId, function(err , product){
      if(err){
        return res.redirect('/');
      }
      cart.add(product,product.id);
      req.session.cart=cart;
      console.log(req.session.cart);
      // console.log(req.session.cart.items);
      res.redirect('/');
    });
});


// cart 
productRoutes.get("/shopping-cart", (req, res,next) => {
    if(!req.session.cart){
        return res.send({products:null});
      } 
      var cart=new Cart( req.session.cart);
      res.status(200).send( {products: cart.generatArray(), totalPrice: cart.totalPrice});
});



// appointmentRoutes.put("/:id", (req, res, next) => {
//     appointmentSchema.update({ _id: req.params.id },
//         { $set: { dateAndTime: req.body.date } },
//         (err) => {
//             if (err) {
//                 return next(err);
//             }
//             else {
//                 appointmentSchema.findById(req.params.id, (err, result) => {
//                     console.log(result);
//                     if (!err) {
//                         res.status(200).send(result);
//                     }
//                     else {
//                         return next(err);
//                     }
//                 })
//             }
//         });
// });

// appointmentRoutes.delete("/:id", (req, res) => {
//     appointmentSchema.deleteOne({ _id: req.params.id },
//         (err, result) => {
//             if (err) {
//                 return next(err);
//             }
//             else {
//                 res.status(200).send({ msg: "Deleted Successfully" });
//             }
//         });
// });
module.exports = productRoutes;
