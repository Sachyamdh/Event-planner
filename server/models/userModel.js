const sql = require("sequelize");
const { sequelize } = require("../config/db");
const bcrypt = require("bcrypt");
const validator = require("validator");
const appError = require("../middleware/errorHandler");
//Establishing relationship of user model with other models
// class User extends sql.Model {
//   //   static associate(models) {
//   //     User.belongsTo(models.Events, { foreignKey: "eventId" });
//   //     User.hasMany(models.Calendar, { foreignKey: "userId" });
//   //   }
// }

//creating a basic User model for our user table
const User = sequelize.define(
  "user",
  {
    id: {
      type: sql.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: sql.DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "First Name Cannot be Null",
        },
        notEmpty: {
          msg: "First Name Cannot be Null",
        },
      },
    },
    lastName: {
      type: sql.DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "First Name Cannot be Null",
        },
        notEmpty: {
          msg: "First Name Cannot be Null",
        },
      },
    },
    age: {
      type: sql.DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Enter a number",
        },
      },
    },
    email: {
      type: sql.DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Enter a valid email address",
        },
      },
    },
    password: {
      type: sql.DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: {
          msg: "Password must contain alphabet and number",
        },
        len: {
          args: [8],
          msg: "Password must be 8 characters long",
        },
      },
    },
    confirmPassword: {
      type: sql.DataTypes.STRING,
      allowNull: true,
      validate: {
        isMatchingPassword(value) {
          if (value !== this.password) {
            throw new appError(
              "ValidationError",
              "Passwords do not match",
              404
            );
          }
          return value;
        },
      },
    },
  },
  {
    tableName: "users",
    schema: "events",
  }
);

User.sync();
// User.beforeCreate(async (password) => {});

module.exports = User;
