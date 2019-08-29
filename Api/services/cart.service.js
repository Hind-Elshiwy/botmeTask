const Cart = require('../Models/shoppingcart.model');

exports.addToCart = (customer_id, kind, quantity, product_id) => {
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
        return cart.save();
      }
    })
    .catch(err => {
      throw err
    })     
}   