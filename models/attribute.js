'use strict';
const {
  Model
} = require('sequelize');
const property = require('./property');
const AttributeCategory = require('./attributecategory');
module.exports = (sequelize, DataTypes) => {
  class Attribute extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Attribute.belongsToMany(models.Property, { through: 'Property_Attribute' });
      Attribute.belongsTo(models.AttributeCategory, { foreignKey: 'category_id', as: 'attributecategory' });
    }
  }
  Attribute.init({
    attribute_name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attribute',
  });
  return Attribute;
};