const sql = require("sequelize");
const { sequelize } = require("../config/db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
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
      unique: true,
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
    passwordChangedAt: {
      type: sql.DataTypes.DATE,
      allowNull: false,
      defaultValue: Date.now(),
    },
    passwordResetToken: {
      type: sql.DataTypes.STRING,
      allowNull: true,
    },
    passwordResetExpire: {
      type: sql.DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    schema: "events",
  }
);

//encrypting the password before the user is created
User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  user.confirmPassword = undefined;
});

//comparing the encrypted password before loggin In
User.prototype.correctPassword = async function (candidatePassword, user) {
  return bcrypt.compare(candidatePassword, user.password);
};

User.prototype.forgetPassword = async function (user) {
  const token = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  //this is 5 minutes. For users who are viewing i converted it into milliseconds
  user.passwordResetExpire = Date.now() + 5 * 60 * 1000;
  return token;
};

//syncing the model
User.sync({ alter: true }).then(() => {
  console.log("Model synced");
});

module.exports = User;
