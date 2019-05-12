module.exports = function (sequelize, DataTypes) {
  //Allowing Null for everything but email as a `User` may be created when referee email is provided.
  var User = sequelize.define("user", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    firstName: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    lastName: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    username: {
      type: DataTypes.STRING,
    },
    about: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    last_login: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active'
    },

  });

  User.associate = function (models) {
    User.belongsToMany(models.Goal, {
      through: {
        model: "userGoals",
        unique: false
      },
      foreignKey: "UserId",
    })
  };


  return User;
};
