module.exports = function(sequelize, DataTypes) {
    var Email = sequelize.define("Email", {
      From: DataTypes.STRING,
      Subject: DataTypes.STRING,
      Body: DataTypes.TEXT
    });
    return Email;
  };