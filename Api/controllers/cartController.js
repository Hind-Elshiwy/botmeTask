const Cart = require('../Models/shoppingcart.model'),
      cartService = require('../services/cart.service');
let productSchema = require("../Models/product.model");

exports.add = (req, res, next) => {
  const { product_id } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  customer_id = req._id;
  kind = "shoppingcart"
  newItem = 0;
  price = Number.parseInt(req.body.price);
  Cart.get({ customer_id, kind })
    .then(cart => {
      console.log(cart)
      if (!cart && quantity <= 0) {
        throw new Error('Invalid request');
      } else if (cart) {
        const indexFound = cart.items.findIndex(item => {
          return item.product._id == product_id;
        });
        console.log(indexFound)
        if (indexFound !== -1 && quantity <= 0) {
          throw new Error('Invalid request');
        } else if (indexFound !== -1) {
          // Item Exists In the Cart
          cart.items[indexFound].quantity += quantity;
          cart.totalPrice += (cart.items[indexFound].product.price * quantity);

        } else if (quantity > 0) {
          //Item is not in the cart
          cart.items.push({
            product: product_id,
            quantity: quantity,
          });
          newItem = 1
          cart.totalPrice += (price * quantity)
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
          ],
          totalPrice: price
        };
        if (cartData.customer == "" || cartData.customer == null) {
          return res.json({ msg: "Customer Id Is required" })
        }
        cart = new Cart(cartData);
        newItem = 1;
        return cart.save();
      }
    })
    .then(savedCart => res.json(newItem))
    .catch(err => {
      return next(err.message);
    });
};




exports.subtract = (req, res, next) => {
  const { product_id } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  customer_id = req._id;
  kind = "shoppingcart"
  removedItem = 0;
  //const price = Number.parseInt(req.body.price);
  console.log('qty: ', quantity);
  Cart.get({ customer_id, kind })
    .then(cart => {
      if (!cart && quantity <= 0) {
        throw new Error('Invalid request');
      } else {
        const indexFound = cart.items.findIndex(item => {
          return item.product._id == product_id;
        });
        if (indexFound !== -1) {
          console.log('index Found: ', indexFound);
          console.log('before update items: ', cart.items);
          let updatedQty = cart.items[indexFound].quantity - quantity;
          cart.totalPrice -= (cart.items[indexFound].product.price * quantity)
          if (updatedQty <= 0) {
            cart.items.splice(indexFound, 1);
            removedItem = 1
          } else {
            cart.items[indexFound].quantity = updatedQty;
          }
          console.log('after update items: ', cart.items);
          return cart.save();
        } else {
          //res.status(404).json({message:"Item Not Found in The Cart"})
          throw new Error("Invalid request : Item Not Found in The Cart");
        }
      }
    })
    .then(updatedCart => res.json({cart :updatedCart, removed: removedItem}))
    .catch(err => {
      return next(err.message);
    });
};



exports.empty = (req, res, next) => {
  customer_id = req._id;
  kind = "shoppingcart"
  Cart.get({ customer_id, kind })
    .then(cart => {
      if (cart) {
        cart.items = [];
        cart.totalPrice = 0;
        return cart.save()
      }
      else
        res.status(404).json({ message: "No Cart Found" })
    })
    .then(emptyCart => res.json(emptyCart))
    .catch(err => {
      return next(err);
    });
}



exports.get = function (req, res, next) {
  customer_id = req._id;
  kind = "shoppingcart"
  Cart.get({ customer_id, kind })
    .then(Cart => {
      if (Cart)
        res.status(200).send(Cart)
      else
        res.status(404).json({ message: "No Cart Found" })
    })
    .catch(err => {
      return next(err);
    });
};


//Remove customer cart
exports.remove = (req, res, next) => {
  customer_id = req._id
  kind = "shoppingcart"
  Cart.get({ customer_id, kind })
    .then(Cart => Cart.remove())
    .then(deletedCart => res.json(deletedCart))
    .catch(err => {
      return next(error);
    });
};


exports.numberOfProdCart = (req, res, next) => {
  customer_id = req._id;
  kind = "shoppingcart"
  Cart.get({ customer_id, kind })
    .then(Cart => {
      if (Cart) {
        //console.log(Cart.items.length + "4444hhhhhhhhhhhhhhhh")
        res.status(200).json(Cart.items.length)
      }
      else
        res.status(404).json({ message: "No Cart Found", number: 0 })
    })
    .catch(err => {
      return next(err);
    });

}