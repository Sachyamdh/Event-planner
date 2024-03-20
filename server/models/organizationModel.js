const sql = require("sequelize");
const { sequelize } = require("../config/db");

class User extends sql.Model {}

User.init({
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
    validate:{
        isInt:{
            msg:"Enter a number"
        },
    }
  },
});
