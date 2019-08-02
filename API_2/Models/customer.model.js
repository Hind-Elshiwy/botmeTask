const mongoose = require('mongoose');
const User = require('./user.model');
const options = { discriminatorKey: 'kind' };

let customerSchema = User.discriminator('customer',
    new mongoose.Schema({
        
    }, options));

module.exports = customerSchema;

