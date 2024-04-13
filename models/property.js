'use strict';
const {
  Model
} = require('sequelize');
const Category = require('./category');
const User = require('./user');
const PropertyType = require('./propertytype');
const PlaceType = require('./placetype');  
const Location = require('./location');
const Booking = require('./booking');
const UserReview = require('./userreview');
// const Attribute = require('./attribute'); 
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Property.belongsToMany(models.Category, { through: 'Property_Category' });
      Property.belongsToMany(models.User, { through: 'favourite' });
      Property.belongsTo(models.User, { foreignKey: 'host_id', as: 'user' });
      Property.belongsTo(models.PropertyType, { foreignKey: 'property_type_id', as: 'propertyType' });
      Property.belongsTo(models.PlaceType, { foreignKey: 'place_type_id', as: 'placeType' });
      Property.belongsTo(models.Location, { foreignKey: 'location_id', as: 'Location' });
      Property.belongsToMany(models.Attribute, { through: 'Property_Attribute' });
      Property.hasMany(models.Booking, { foreignKey: 'property_id', as: 'booking' });
      Property.hasMany(models.UserReview, { foreignKey: 'property_id', as: 'userreview' });
    }
  }
  Property.init({
    nightly_price: DataTypes.FLOAT,
    property_name: DataTypes.STRING,
    num_guests: DataTypes.INTEGER,
    num_beds: DataTypes.INTEGER,
    num_bedrooms: DataTypes.INTEGER,
    num_bathrooms: DataTypes.INTEGER,
    is_guest_favourite: DataTypes.BOOLEAN,
    description: DataTypes.STRING,
    address_line_1: DataTypes.STRING,
    address_line_2: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Property',
  });
  return Property;
};