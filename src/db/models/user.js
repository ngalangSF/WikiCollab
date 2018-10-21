'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
     type: DataTypes.STRING,
     allowNull: false
    },
    email: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
       isEmail: { msg: "must be a valid email" }
     }
    },
    password: {
     type: DataTypes.STRING,
     allowNull: false
    },
    role: {
     type: DataTypes.STRING,
     allowNull: false,
     defaultValue: "standard"
    }
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Wiki, {
       foreignKey: "userId",
       as: "wikis"
     });
  };
  User.prototype.isAdmin = function() {
     return this.role === "admin";
   };

   User.prototype.isStandard = function() {
     return this.role === "standard";
   };

   User.prototype.isPremium = function() {
     return this.role === "premium";
   };

  return User;
};
