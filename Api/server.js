const port = 3000;
const express = require("express"),
    path = require("path"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    mongoose = require("mongoose"),
    userRoutes = require("./Routes/userRoutes"),
    productRoutes = require("./Routes/productRoutes"),
    cartRoutes = require("./Routes/cartRoutes");


// const authenticate = require("./middleware/jwt");
const server = express();

mongoose.connect(
    "mongodb://localhost:27017/botme",
    {  useCreateIndex: true ,
       useNewUrlParser: true },
    error => {
        if (error) {
            console.log("DB Connection Error " + error);
            next(error);
        }
    }
);

server.use(morgan("short"));
server.use('/uploads', express.static('uploads'));
server.use(cors({ origin: true }));
server.use(bodyParser.json());

server.use("/api/user", userRoutes);
// Authentication midleware
// server.use(authenticate);

server.get('/', (req, res) => {
    console.log(req._id);
    // res.send("hello world");
});
server.use("/api/product", productRoutes);
server.use("/api/cart", cartRoutes);

server.use((err, req, res, next) => {
    console.log(err);
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else
        res.status(404).json(err)
});

server.listen(port, () => {
    console.log(`I am Listening on port ${port}`);
});