'use strict';
const {
  Model
} = require('sequelize');
const Attribute = require('./attribute');
module.exports = (sequelize, DataTypes) => {
  class AttributeCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AttributeCategory.hasMany(models.Attribute, { foreignKey: 'category_id', as: 'attribute' });
    }
  }
  AttributeCategory.init({
    category_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AttributeCategory',
  });
  return AttributeCategory;
};