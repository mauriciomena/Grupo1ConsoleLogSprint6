"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // hasMany relations      
      User.hasMany(models.Order, {
        as: 'orders',
        foreignKey: 'users_id'
      })

      User.belongsTo(models.Roll,{
        as:'rolls',
        foreignKey:'roll_id'
      })
      
      User.belongsTo(models.Address, {
        as: 'addresses',
        foreignKey:'addresses_id'
      })

    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      addresses_id: DataTypes.INTEGER,
      roll_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
