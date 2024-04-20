'use strict';
const {
  Model
} = require('sequelize');
const Booking = require('./booking');
module.exports = (sequelize, DataTypes) => {
  class BookingStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookingStatus.hasMany(models.Booking, { foreignKey: 'booking_status_id', as: 'booking' });
    }
  }
  BookingStatus.init({
    status_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BookingStatus',
  });
  return BookingStatus;
};