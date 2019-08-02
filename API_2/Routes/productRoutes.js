let express = require("express");
let productRoutes = express.Router();
const productController = require('../controllers/productController');



productRoutes.use(authenticate);
productRoutes.post("", productController.get);
productRoutes.put("/:id",productController.update);
productRoutes.get("",productController.getall); //Get all products
productRoutes.get("/owner",productController.getforowner); // Get all products for current owner
productRoutes.get("/:id",productController.find);
productRoutes.delete("/:id",productController.delete);


module.exports = productRoutes;
