const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let itemSchema = new mongoose.Schema({
    product: {
      type: ObjectId, ref: "Product", required: "The item must be A product"},
    quantity: {
      type: Number, required: "Quantity Is Required", min: [1, 'Quantity can not be less then 1.']}
  });
let cartSchema = new mongoose.Schema({
    customer: { type: ObjectId, ref: "User", required: "There must be Customer for this Product" },
    items: [itemSchema],
    totalPrice: { type: Number }

});

//statics works on all the model , takes customer id and returns the cart 
cartSchema.statics = {
    get ({ customer_id } = {}) {
      let condition = { customer: customer_id };
      return this.findOne(condition)
      .populate({
        path: 'items.product'
      })
      .exec();
    }
};
module.exports = mongoose.model('Cart', cartSchema);

