const express = require('express');
const mustache = require('mustache-express');
const Item = require('./item').Item;
const Purchase = require('./item').Purchase;
const bodyparser = require('body-parser');
//const Sequelize = require('sequelize');
const app = express();
const sequelize = require('sequelize');
const db = new Sequelize('vending', '', '', {
  host: 'localhost',
  dialect: 'postgres'
});

const models = require("./models");
Item.sync().then(function(){
  console.log("Item schema is synced");
});
Purchase.sync().then(function(){
  console.log("Purchase schema is synced");
});
app.use(express.static('public'));
app.set('views','./views');
app.use(bodyparser.urlencoded({extended: false}));
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.get('/api/customer/items', function (req, res){
  Item.findAll().then(function (data){
    res.send(data);
  });
});

function addItem(){
  Item.create({
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
    quanity: req.body.quanity,
  }).then(function(){
    console.log("Hello");
    res.sendStatus(200);
  });
};
function updateItem(){
Item.update({
  name: req.body.name,
  description: req.body.description,
  cost: req.body.cost,
  quanity: req.body.quanity,
}, {
  where: {
  id: req.params.itemId,
  },
}).then(function(){
  console.log("Hello");
  res.sendStatus(200);
});
};
function purchaseItems(result){
  Item.update({
    quanity: result.quanity - req.body.quanity_purchased,
  }, { where: { id: req.params.itemId }}
)
Purchase.create({
    name: result.name,
    quanity_purchased: req.body.quanity_purchased,
    total: result.cost * req.body.quanity_purchased,
    itemId: req.params.itemId,
    }).then(function(){
    console.log("Hello");
res.sendStatus(200);
});
};
app.post('/api/customer/items/:itemId/purchases', function (req, res){
  Item.findById(parseInt(req.params.itemId))
    .then(function (result){
      console.log(result);
      console.log(req.body.formInput);
      if (result.quanity > 0 && parseFloat(req.body.formInput) > result.cost){
        purchaseItems(result);
        change = req.body.formInput - result.cost;
};
});
});
app.post('/api/vendor/purchases', function (req, res){
addItem();
});
  //select items.name, purchases."createdAt" from items join purchases on items.id = purchases."itemId";

// });

app.get('/api/vendor/money', function (req, res){

});
app.post('/api/vendoer/items', function (req, res){

});
app.put('/api/vendor/items/:itemId', function(req, res){
updateItem();
});

app.listen(3600, function (req, res){
  console.log("The server is now up and running");
});
