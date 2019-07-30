const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let productSchema = mongoose.Schema({
    name: { type: String, required: "Name can't be empty" },
    owner: { type: ObjectId, ref: "User", required: "There must be owner for this Product" },
    mainImg: { type: String },
    price: { type: Number, required: "Price is required" },
    desc: { type: String, required: "Description is required" }
})



module.exports = mongoose.model('Product', productSchema);