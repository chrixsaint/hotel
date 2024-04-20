'use strict';
const {
  Model
} = require('sequelize');
const Property = require('./property');
const Language = require('./language');
const Booking = require('./booking');
const UserReview = require('./userreview');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Property, { through: 'favourite' });
      User.belongsToMany(models.Language, { through: 'user_language' });
      User.hasMany(models.Property, { foreignKey: 'host_id', as: 'properties' });
      User.hasMany(models.Booking, { foreignKey: 'user_id', as: 'booking' });
      User.hasMany(models.UserReview, { foreignKey: 'user_id', as: 'userreview' });
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    birthdate: DataTypes.DATEONLY,
    email: DataTypes.STRING
  },  {
    sequelize,
    modelName: 'User',
  });
  return User;
};