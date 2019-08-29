const mongoose = require('mongoose'),
options = { discriminatorKey: 'kind' };
const ObjectId = mongoose.Schema.Types.ObjectId;

let itemSchema = new mongoose.Schema({
    product: {
      type: ObjectId, ref: "Product", required: "The item must be A product"},
    quantity: {
      type: Number, required: "Quantity Is Required", min: [1, 'Quantity can not be less then 1.']}
  });
let cartSchema = new mongoose.Schema({
    customer: { type: ObjectId, ref: "User", default:null},
    items: [itemSchema],
    psid: {type: String ,default:null}

}, options);

//statics works on all the model , takes customer id and returns the cart 
cartSchema.statics = {
    get ({ customer_id, kind } = {}) {
      let condition = { customer: customer_id, kind: kind };
      return this.findOne(condition)
      .populate({
        path: 'items.product'
      })
      .exec();
    },
    getWithPsid ({ sender_psid, kind } = {}) {
      let condition = { psid: sender_psid, kind: kind };
      return this.findOne(condition)
      .populate({
        path: 'items.product'
      })
      .exec();
    }
};
module.exports = mongoose.model('Cart', cartSchema);

