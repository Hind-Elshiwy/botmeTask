let express = require("express"),
    multer = require("multer");

let productRoutes = express.Router();
let productSchema = require("../Models/product.model");

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

productRoutes.post("", upload.single("mainImg"), (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    req.body.mainImg = req.file.path;
    let product = new productSchema(req.body);
    product.owner = req._id;
    console.log(product);
    product.save((err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    })
})

productRoutes.put("/:id", upload.single("mainImg"), (req, res, next) => {
    if (req.file) {
        req.body.mainImg = req.file.path;
    }
    console.log(req.body);
    productSchema.update({ _id: req.params.id },
        req.body, err => {
            if (!err) {
                productSchema.findById(req.params.id, (err, result) => {
                    if (!err) {
                        console.log(result);
                        res.status(200).send(result);
                    }
                    else {
                        console.log(err);
                        return next(err);
                    }
                })
            }
            else {
                console.log(err);
                return next(err);
            }
        })
})
// Get all products
productRoutes.get("", (req, res, next) => {
    productSchema.find({}, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    });
})



// Get all products for current owner
productRoutes.get("/owner", (req, res, next) => {
    productSchema.find({ owner: req._id }, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    });
})

productRoutes.get("/:id", (req, res, next) => {
    productSchema.findById(req.params.id, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    });
});

productRoutes.delete("/:id", (req, res, next) => {
    productSchema.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send({ msg: "Deleted Successfully" });
        }
    });
})


module.exports = productRoutes;
