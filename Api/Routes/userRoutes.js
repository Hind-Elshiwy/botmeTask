let express = require("express")
let userRoutes = express.Router();
const userController = require('../controllers/userController');



userRoutes.post("/signup",userController.signup);
userRoutes.post("/signin",userController.signin);
userRoutes.use(authenticate);
userRoutes.get("",userController.get);
userRoutes.put("",userController.update);



module.exports = userRoutes;