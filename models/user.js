'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.hasMany(models.upload)
      models.user.belongsToMany(models.upload, {through: "saves"})
    }
    validPassword(passwordTyped) {
      return bcrypt.compareSync(passwordTyped, this.password);
    };

    toJSON() {
      let userData = this.get();
      delete userData.password;
      return userData;
    }
  };

  user.init({
    artistName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });

  user.beforeCreate((pendingUser, options) => {
    if (pendingUser && pendingUser.password) {
      let hash = bcrypt.hashSync(pendingUser.password, 12);
      pendingUser.password = hash;
    }
  })

  return user;
};