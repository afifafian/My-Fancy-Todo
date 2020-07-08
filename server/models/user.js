'use strict';

const bcrypt = require('bcrypt')
const saltRounds = 10

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'name cannot be empty!'
        },
        notNull: {
          msg: 'name cannot be empty!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'email cannot be empty!'
        },
        notNull: {
          msg: 'email cannot be empty!'
        },
        isEmail: {
          msg: 'email format should be for example: "johndoe@mail.com"'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password cannot be empty!'
        },
        notNull: {
          msg: 'password cannot be empty!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', function(instance, option){
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(instance.password, salt);
    instance.password = hash
  })
  return User;
};