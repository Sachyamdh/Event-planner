const sql = require("sequelize");
const { sequelize } = require("../config/db");

class User extends sql.Model {
//   static associate(models) {
//     User.belongsTo(models.Events, { foreignKey: "eventId" });
//     User.hasMany(models.Calendar, { foreignKey: "userId" });
//   }
}

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
      allowNull: true,
      validate: {
        isInt: {
          msg: "Enter a number",
        },
      },
    },
    email: {
      type: sql.DataTypes.email,
      require: true,
      validate: {
        isEmail: {
          msg: "Enter a valid email address",
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

module.exports = User;
