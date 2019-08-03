const express = require('express');
const cartRoutes = express.Router();
const CartController = require('../controllers/cartController');


cartRoutes.use(authenticate);
cartRoutes.get('', CartController.get);
cartRoutes.post('/add', CartController.add);
cartRoutes.post('/subtract', CartController.subtract);
cartRoutes.post('/empty', CartController.empty);
module.exports = cartRoutes;
