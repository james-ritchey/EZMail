module.exports = function(sequelize, DataTypes) {
    var Account = sequelize.define("Account", {
      email: DataTypes.STRING,
      server: DataTypes.TEXT
    });
    return Account;
  };