const Sequelize = require('sequelize');
const db = new Sequelize('vending', '', '', {
  host: 'localhost',
  dialect: 'postgres'
});

const Item = db.define('item', {
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement:true,
  },
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
    cost: {
    type: Sequelize.DECIMAL,
  },
  quanity: {
    type: Sequelize.INTEGER,
  }
});

const Purchase = db.define('purchase',{
  id: {
  type: Sequelize.INTEGER,
  primaryKey: true,
  autoIncrement:true,
},
name: {
  type: Sequelize.STRING,
},
  quanity_purchased:
  {
      type: Sequelize.INTEGER,
},
  total:
  {
    type: Sequelize.DECIMAL,
},
});
Purchase.belongsTo(Item, {foreignKey: 'itemId'});
// Purchase.belongsTo(Item, {foreignKey: 'name'});
module.exports = {Item: Item, Purchase: Purchase};
