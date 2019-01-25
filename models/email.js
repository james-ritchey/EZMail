module.exports = function(sequelize, DataTypes) {
    var Email = sequelize.define("Email", {
      From: DataTypes.STRING,
      Subject: DataTypes.STRING,
      To: DataTypes.STRING,
      Body: DataTypes.TEXT,
      SendDate: DataTypes.DATE
    });
    return Email;
  };