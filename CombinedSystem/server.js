// Setting up required constants
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')
const store = require('./store')
//const auth = require('./auth2')
const cors = require('cors')
const checkID = require('./checkID')


// Mounts middleware to directory path
app.use('/', router);
app.use(bodyParser.json())
app.use(cors())


// When visiting / if the user has a cookie they are logged in
app.get('/', (req, res) => {
    res.json("loaded")
});

app.get('/retrieve/:id', function(req, res) {
    store.retrieveHop(req, res).then((hop) =>
        res.json(hop)
    );
})

app.get('/retrieve', function (req, res) {
    store.retrieveHops().then((hop) => 
        res.json(hop)
    );
   
})

app.post('/addhop', (req, res) => {
  store.addHops({
      variety: req.body.variety,
      amount: req.body.amount,
      bitterness: req.body.bitterness,
      sweetness: req.body.sweetness,
      price: req.body.price,
    })
    .then(() => res.sendStatus(200))
})


app.listen(7556, () => {
    console.log('Server is running on port 7556');
});