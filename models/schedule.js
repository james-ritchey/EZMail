module.exports = function(sequelize, DataTypes) {
    var Schedule = sequelize.define("Schedule", {
      SendDate: DataTypes.STRING,
      Email: DataTypes.TEXT
    });
    return Schedule;
  };