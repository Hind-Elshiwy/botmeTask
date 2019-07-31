const mongoose = require('mongoose');

let cartSchema = new mongoose.Schema({
    items: { type: Number},
    totalQty: { type: Number},
    totalPrice: { type: Number }


});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;





 









