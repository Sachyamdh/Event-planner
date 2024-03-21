const sql = require("sequelize");
const { sequelize } = require("../config/db");
const bcrypt = require("bcrypt");
const validator = require("validator");

//Establishing relationship of user model with other models
class User extends sql.Model {
  //   static associate(models) {
  //     User.belongsTo(models.Events, { foreignKey: "eventId" });
  //     User.hasMany(models.Calendar, { foreignKey: "userId" });
  //   }
}

//creating a basic User model for our user table
User.init(
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
        validator: function (el) {
          return el === this.password;
        },
        msg: "Passwords do not match",
      },
    },
    confirmPassword: {
      type: sql.DataTypes.STRING,
      allowNull: true,
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
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);
// User.beforeCreate(async (password) => {});

module.exports = User;
