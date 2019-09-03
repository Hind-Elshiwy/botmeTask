let productSchema = require("../Models/product.model");

exports.add = (req, res, next) => {
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
}


exports.update = (req, res, next) => {
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
}




exports.getall =(req, res, next) => {
    productSchema.find({}, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    });
}



exports.getforowner =(req, res, next) => {
    productSchema.find({ owner: req._id }, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    });
}




exports.find =(req, res, next) => {
    productSchema.findById(req.params.id, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    });
}




exports.delete =(req, res, next) => {
    productSchema.deleteOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send({ msg: "Deleted Successfully" });
        }
    });
}



exports.paginat=(req, res, next) => {
    let limit = 5
    loadCount = parseInt(req.query.load)
    // console.log(loadCount)
    productSchema.find({}, (err, result) => {
        if (err) {
            return next(err);
        }
        else {
            res.status(200).send(result);
        }
    }).sort({name: 1}).skip(limit * loadCount).limit(limit);
   
}
