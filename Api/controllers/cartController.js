const Cart = require('../Models/cart.model');

exports.add = (req, res, next) => {
  const { product_id } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  console.log('qty: ', quantity);
  Cart.findOne({ customer: req._id }, (err, result) => {
    if(err) {
      return next(err)
    }
    if(result) {
      return res
    }
  })
  .then(cart => {
      if (!cart && quantity <= 0) {
        throw new Error('Invalid request');
      } else if (cart) {
        const indexFound = cart.items.findIndex(item => {
          return item.product == product_id;
        });
        console.log(indexFound)
        if (indexFound !== -1 && quantity <= 0) {
        throw new Error('Invalid request');          
        } else if (indexFound !== -1) {
          cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
        } else if (quantity > 0) {
          cart.items.push({
            product: product_id,
            quantity: quantity
          });
        } else {
          throw new Error('Invalid request');
        }
        return cart.save();
      } else {
        const cartData = {
          customer: req._id,
          items: [
            {
              product: product_id,
              quantity: quantity
            }
          ]
        };
        cart = new Cart(cartData);
        return cart.save();
      }
    })
    .then(savedCart => res.json(savedCart))
    .catch(err => {
      return next(err);
    });
};




exports.subtract = (req, res, next) => {
  const { product_id } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  console.log('qty: ', quantity);
  Cart.findOne({ customer: req._id }, (err, result) => {
    if(err) {
      return next(err)
    }
    if(result) {
      return res
    }
  })
  .then(cart => {
      if (!cart && quantity <= 0) {
        throw new Error('Invalid request');
      } else {
        const indexFound = cart.items.findIndex(item => {
          return item.product == product_id;
        });
        if (indexFound !== -1) {
          console.log('index Found: ', indexFound);
          console.log('before update items: ', cart.items);
          let updatedQty = cart.items[indexFound].quantity - quantity;
          if (updatedQty <= 0) {
            cart.items.splice(indexFound, 1);
          } else {
            cart.items[indexFound].quantity = updatedQty;
          }
          console.log('after update items: ', cart.items);
          return cart.save();
        } else {
          throw new Error('Invalid request');
        }
      }
    })
    .then(updatedCart => res.json(updatedCart))
    .catch(err => {
      return next(err);
    });
};

exports.empty = (req, res, next) => {
  customer_id = req._id;
  Cart.get({ customer_id })
    .then(cart => {
      if(cart){
        cart.items = [];
        return cart.save()
      } 
      else
        res.status(404).json({message:"No Cart Found"})  
    })
    .then(emptyCart => res.json(emptyCart))
    .catch(err => {    
      return next(err);
    });
}



exports.get = function (req, res, next) {
  customer_id = req._id;
  Cart.get({ customer_id })
    .then(Cart => {
      if(Cart) 
        res.status(200).send(Cart)
      else
        res.status(404).json({message:"No Cart Found"})  
    })
    .catch(err => {    
      return next(err);
    });
};


//Remove customer cart
exports.remove = (req, res, next) => {
  customer_id = req._id
  Cart.get({ customer_id })
    .then(Cart => Cart.remove())
    .then(deletedCart => res.json(deletedCart))
    .catch(err => {
      return next(error);
    });
};
