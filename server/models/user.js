'use strict';
const {
  Model
} = require('sequelize');
const { genSalt } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Selang, { foreignKey: 'userId' })
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Username is required'
        },
        notEmpty : {
          msg : 'Username is required'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : true,
      validate : {
        notNull : {
          msg : 'email is required'
        },
        notEmpty : {
          msg : 'email is required'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'password is required'
        },
        notEmpty : {
          msg : 'password is required'
        }
      }
    },
    role : {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'role is required'
        },
        notEmpty : {
          msg : 'role is required'
        }
      }
    },
  }, {
    hooks : {
      beforeCreate(instance, option) {
        instance.password = genSalt(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};