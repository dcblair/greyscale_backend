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
      models.upload.belongsTo(models.label)
      models.upload.belongsTo(models.user)
      models.upload.belongsToMany(models.tag, {through: "uploadTags"})
      models.upload.belongsToMany(models.user, {through: "saves"})
    }
  };
  upload.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    labelId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    artist: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    album: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isPublic: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    genre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'upload',
  });
  return upload;
};