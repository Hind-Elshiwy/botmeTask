const authenticate = require("../middleware/jwt");

// =============================================
let User = require("../Models/user.model");
let ownerSchema = require('../Models/owner.model');
let customerSchema = require('../Models/customer.model');
// let Cart=require('../Models/cart.model');


exports.signup = (request, response, next) => {
    console.log(request.body);
    let user = {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password
    };
    if (request.body.role === "customer") {
        user = new customerSchema(user);


    }
    else if (request.body.role === "owner") {
        user = new ownerSchema(user);
    }
    else {
        return response.status(422).send(["Invalid User Type"]);
    }
    user.save((err, user) => {
        if (!err) {
            response.status(200).json({ "token": user.generateJwt() });
            //creat cart with registering a user , so every user will have one cart 
            //var cart=new Cart();
        } else {
            console.log(err);
            if (err.code == 11000)
                response.status(422).send(['Email already exist']);
            else
                return next(err);
        }
    })
}



exports.signin = (req, res) => {
    console.log(req.body);
    User.findOne({ email: req.body.email, kind: req.body.role },
        (err, user) => {
            if (err)
                res.status(404).json(err);
            // unknown user
            else if (!user)
                res.status(401).json({ message: 'No such account' });
            // wrong password
            else if (!user.verifyPassword(req.body.password))
                res.status(401).json({ message: 'Wrong password' });
            // authentication succeeded
            else
                res.status(200).json({ "token": user.generateJwt() });
        });
}



exports.get =(req, res) => {
    User.findById(req._id, (err, user) => {
        if (err) {
            console.log(err);
            res.status(404).send(err);
        }
        else {
            res.status(200).send(user);
        }
    })
}



exports.update =(req, res, next) => {
    console.log(req.body);
    User.update({ _id: req._id },
        req.body, err => {
            if (!err) {
                User.findById(req._id, (err, result) => {

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