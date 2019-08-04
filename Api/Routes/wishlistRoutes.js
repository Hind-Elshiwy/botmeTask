const express = require('express');
const wishilistRoutes = express.Router();
const wishilistController = require('../controllers/wishlistController');


wishilistRoutes.use(authenticate);
wishilistRoutes.get('', wishilistController.get);
wishilistRoutes.post('/add', wishilistController.add);
wishilistRoutes.post('/remove', wishilistController.remove);
wishilistRoutes.post('/empty', wishilistController.empty);
module.exports = wishilistRoutes;
