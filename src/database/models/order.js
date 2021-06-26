'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // hasOne associations
      Order.hasOne(models.Shipping, {
        as:'shippings',
        foreignKey: 'orders_id'
      })

      // hasMany associations
      Order.hasMany(models.OrderDetail, {
        as: 'orderdetails',
        foreingnKey: 'orders_id'
      })
  
      // belongsTo associations
      Order.belongsTo(models.Payment, {
        as: 'payments'
      })

      Order.belongsTo(models.State, {
        as: 'states'
      })

      Order.belongsTo(models.User, {
        as: 'users'
      })      

    }
  };
  Order.init({
    number: DataTypes.INTEGER,
    date: DataTypes.DATE,
    total: DataTypes.DECIMAL,
    payments_id: DataTypes.INTEGER,
    users_id: DataTypes.INTEGER,
    states_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};