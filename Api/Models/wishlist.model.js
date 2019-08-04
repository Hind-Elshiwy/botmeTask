const mongoose = require('mongoose');
const wishlist = require('./cart.model');
const options = { discriminatorKey: 'kind' };

let wishlistSchema = wishlist.discriminator('wishlist',
    new mongoose.Schema({

    }, options));

module.exports = wishlistSchema;
