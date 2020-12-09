'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class upload extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  upload.init({
    userId: DataTypes.INTEGER,
    labelId: DataTypes.INTEGER,
    artist: DataTypes.STRING,
    album: DataTypes.STRING,
    isPublic: DataTypes.BOOLEAN,
    genre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'upload',
  });
  return upload;
};