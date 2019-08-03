let express = require("express");
let productRoutes = express.Router();
const productController = require('../controllers/productController');

let multer = require("multer");
// multer
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg')
        cb(null, true);
    else
        cb(new Error("Not supported image type"), false);
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});
const upload = multer(
    { storage: storage, fileFilter: fileFilter }
);
// ===============================================================




productRoutes.use(authenticate);
productRoutes.post("", upload.single("mainImg"), productController.add);
productRoutes.put("/:id", upload.single("mainImg"), productController.update);
productRoutes.get("",productController.getall); //Get all products
productRoutes.get("/owner",productController.getforowner); // Get all products for current owner
productRoutes.get("/:id",productController.find);
productRoutes.delete("/:id",productController.delete);


module.exports = productRoutes;
