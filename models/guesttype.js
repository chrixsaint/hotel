'use strict';
const {
  Model
} = require('sequelize');
const Booking = require('./booking');
module.exports = (sequelize, DataTypes) => {
  class GuestType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GuestType.belongsToMany(models.Booking, { through: 'BookingGuest' });
    }
  }
  GuestType.init({
    type_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'GuestType',
  });
  return GuestType;
};