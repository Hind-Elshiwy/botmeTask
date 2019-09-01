// const port = 3000;
const express = require("express"),
  path = require("path"),
  cors = require("cors"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  userRoutes = require("./Routes/userRoutes"),
  productRoutes = require("./Routes/productRoutes"),
  cartRoutes = require("./Routes/cartRoutes"),
  wishlistRoutes = require("./Routes/wishlistRoutes"),
  // PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN,
  shoppingCartModel = require('./Models/shoppingcart.model'),
  productSchema = require("./Models/product.model"),
  request = require('request'),
  fbTemplate = require('fb-message-builder');
  PAGE_ACCESS_TOKEN="EAAiQLlHOQ7EBABZB6ZCgZBhGOdBZCCroExAvkBYcZAW7GCZAouTosvsmp287YqEoZBeQki1qfbEMBthDHsNF4C37a2EhAv4PzpQfE9ZATTRxVYiQpVPNL1i4FwrKLfFopRrfOkULsSuj7ODXsI1UkoYTBUaPBVgIhzMIXQ7vFCeySwZDZD"
// console.log(PAGE_ACCESS_TOKEN)


/////////////////////////////////////////////////////////////////////////////////////////////
function handleMessage(sender_psid, received_message) {
  console.log("nodyyyyyyy")
  console.log(received_message.length)
  // console.log(received_message.text + "hhhhhhhh")
  let response;
  let attachment_url;
  // Check if the message contains text
  if (received_message.length > 0) {
    // Create the payload for a basic text message
    // response = {
    //   "text": `You sent the message: "${received_message.text}". Now send me an image!`
    // }

    response = {
      "attachment": {
        "type": "template",
        "payload": {
          "template_type": "generic",
          "elements": []
        }
      }
    }
    received_message.forEach(item => {
      attachment_url = "https://4.bp.blogspot.com/-_76hP7FTFr0/XHdfP0L1HhI/AAAAAAAAAGA/RM4D0PGpgnQUQi4W-402KIIURQnb-KtSACLcBGAs/s1600/Anahita%2BHashemzade%2BBio%252C%2BAge%252C%2BFamily%252C%2BWiki%252C%2BHD%2BWallpaper%252C%2BHD%2Bpics.jpg";
      //let attachment_url = "/home/more/Desktop/botmeTask-master-massenger/Api/uploads/2019-08-03T21:42:12.579Z7ff6d0bc3c29eed66e5386479feceaf2.jpg"
      response.attachment.payload.elements.push({
        "title": item.name,
        "subtitle": item.desc,
        "image_url": attachment_url,
        "buttons": [
          {
            "type": "postback",
            "title": "Add to Cart",
            "payload": item._id,
          },
        ],
      })
    })
     // Sends the response message
     callSendAPI(sender_psid, response);

  }

  // console.log(response.text)
 
}
let message;
// Handles messages events
// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback,kind) {
  let prod_id=received_postback.payload;
  //let name=received_postback.payload.name;
  sender_psid=sender_psid;
shoppingCartModel.getWithPsid({ sender_psid ,kind})
  .then(Cart => {
    if(Cart){ 
console.log(Cart+"lololololololo")

      const indexFound = Cart.items.findIndex(item => {
        console.log(item.product + "LaLALAALLALALALA")
        return item._id == prod_id;
      });
      if(indexFound !== -1){
        Cart.items[indexFound].quantity += 1;
        // cart.totalPrice += (cart.items[indexFound].product.price * quantity);
      } else{
        Cart.items.push({
          product: prod_id,
          quantity: 1,
        });
      }
    console.log(Cart +"jjjjjjjjjjjjjjjjj")
    // return Promise.reject("Error")
       Cart.save();

      productSchema.findById(prod_id)
      .then(res => {
         response = {
          "text": `${res.name} Was Added`
        }
       
       callSendAPI(sender_psid, response);
      })
      .catch(err=>{
        response = {
          "text": `Product is not Found`
        }
       
       callSendAPI(sender_psid, response);
      })
     } 
  })
  .catch(err => {    
    response = {
      "text": `it is not added to the cart`
    }
   callSendAPI(sender_psid, response);
      console.log(err)
   });


  console.log(received_postback.payload+"  postback y 7agahhhh")
}

// // Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
      // console.log(request_body)
    } else {


      console.error("Unable to send message:" + err);
    }
  });
}

//////////////////////////////////////////////////////////////////////////////////////////


// const authenticate = require("./middleware/jwt");
const server = express();

mongoose.connect(
  "mongodb://localhost:27017/botme",
  // "mongodb+srv://deb402595:hindhindhind@cluster0-wcpha.mongodb.net/test?retryWrites=true&w=majority",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  },
  (error) => {
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
  res.send("hello world");
});


// Adds support for GET requests to our webhook
server.get('/webhook', (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "EAAiQLlHOQ7EBABZB6ZCgZBhGOdBZCCroExAvkBYcZAW7GCZAouTosvsmp287YqEoZBeQki1qfbEMBthDHsNF4C37a2EhAv4PzpQfE9ZATTRxVYiQpVPNL1i4FwrKLfFopRrfOkULsSuj7ODXsI1UkoYTBUaPBVgIhzMIXQ7vFCeySwZDZD"

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});








// Creates the endpoint for our webhook 
server.post('/webhook', (req, res) => {
  let body = req.body;
  let kind = "shoppingcart";
  // let sender_psid;
  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {
      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      let webhook_event = entry.messaging[0];
      console.log(webhook_event+"webhook eventosss");
      // console.log(webhook_event.sender.id);

      // Get the sender PSID
       let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);



      shoppingCartModel.getWithPsid({ sender_psid, kind })
        .then(cart => {
          if (cart) {
            console.log(cart)
          }
          else {
            //console.log('Cart Not Found')
            const cartData = {
              psid: sender_psid,
              items: [],
              totalPrice: 0
            };
            cart = new shoppingCartModel(cartData);
            cart.save();
          }
          productSchema.find({}, (err, result) => {
            if (err) {
              console.log(err)
            }
            else {
              // Check if the event is a message or postback and
              // pass the event to the appropriate handler function
              if (webhook_event.message) {
                console.log(webhook_event.message + "hindooooooooooooooooooooo")
                handleMessage(sender_psid, result);
              } else if (webhook_event.postback) {
                console.log(webhook_event.postback+"gogoooooooooooos")
                console.log(sender_psid)
                handlePostback(sender_psid, webhook_event.postback,kind);
              }
            }
          });
        })
        .catch(err => {
          console.log(err)
        })
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});





server.use("/api/product", productRoutes);
server.use("/api/cart", cartRoutes);
server.use("/api/wishlistcart", wishlistRoutes);


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

// Send all requests to index.html
server.get('/*', (req, res)=> {
  res.sendFile(path.join(__dirname + '/dist/client/index.html'));
});

server.listen(process.env.PORT || 3000, function(){
  console.log('Your node js server is running');
});

// server.listen(port, () => {
//   console.log(`I am Listening on port ${port}`);
// });