let wishlistSchema = require("../Models/wishlist.model");



exports.add = (req, res, next) => {
  const { product_id } = req.body;
  customer_id = req._id;
  kind = "wishlistcart"
  wishlistSchema.get({customer_id,kind})
  .then(cart => {
    console.log(cart)
      if (cart) {
        const indexFound = cart.items.findIndex(item => {
          return item.product._id == product_id;
        });
        console.log(indexFound)
        if (indexFound !== -1) {
          // Item Exists In the Cart
          throw new Error('Item Already Exist In the Cart');

        } else {
          //Item is not in the cart
          cart.items.push({
            product: product_id,
            quantity: 1
          });
        }
        return cart.save();
      } else {
        const cartData = {
          customer: req._id,
          items: [
            {
              product: product_id,
              quantity: 1
            }
          ],
        };
        cart = new wishlistSchema(cartData);
        return cart.save();
      }
    })
    .then(savedCart => res.json(savedCart))
    .catch(err => {
      return next(err.message);
    });
};




exports.remove = (req, res, next) => {
  const { product_id } = req.body;
  customer_id = req._id;
  kind = "wishlistcart"
  wishlistSchema.get({customer_id,kind})
  .then(cart => {
      if (!cart) {
        throw new Error('you dont have a  wishlistCart');
      } else {
        const indexFound = cart.items.findIndex(item => {
          return item.product._id == product_id;
        });
        if (indexFound !== -1) {
            cart.items.splice(indexFound, 1);
            return cart.save();
        } else {
          throw new Error("Invalid request : Item Not Found in The WishlistCart");
        }
      }
    })
    .then(updatedCart => res.json(updatedCart))
    .catch(err => {
      return next(err.message);
    });
};



exports.empty = (req, res, next) => {
  customer_id = req._id;
  kind = "wishlistcart"
  wishlistSchema.get({ customer_id,kind })
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
  kind = "wishlistcart"
  wishlistSchema.get({ customer_id,kind })
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



