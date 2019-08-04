const mongoose = require('mongoose');
const shoppingcart = require('./cart.model');
const options = { discriminatorKey: 'kind' };

let shoppingcartSchema = shoppingcart.discriminator('shoppingcart',
    new mongoose.Schema({
        totalPrice: { type: Number }

    }, options));

module.exports = shoppingcartSchema;
