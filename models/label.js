'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class label extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.label.hasMany(models.upload)
    }
  };
  label.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'label',
  });
  return label;
};