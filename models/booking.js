'use strict';
const {
  Model
} = require('sequelize');
const Location = require('./location');
const User = require('./user');
const BookingStatus = require('./bookingstatus');
const GuestType = require('./guesttype');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.Location, { foreignKey: 'property_id', as: 'location' });
      Booking.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Booking.belongsTo(models.BookingStatus, { foreignKey: 'booking_status_id', as: 'bookingstatus' });
      Booking.belongsToMany(models.GuestType, { through: 'BookingGuest' });
    }
  }
  Booking.init({
    checkin_date: DataTypes.DATE,
    checkout_date: DataTypes.DATE,
    nightly_price: DataTypes.FLOAT,
    service_fee: DataTypes.FLOAT,
    cleaning_fee: DataTypes.FLOAT,
    total_price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};