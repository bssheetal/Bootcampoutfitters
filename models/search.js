module.exports = function (sequelize, DataTypes) {
    var Searchregion = sequelize.define("Searchregion", {

        latitude: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false,
            validate: {
              isDecimal: true
            }
          },
          longitude: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false,
            validate: {
              isDecimal: true
            }
          }
          
    });

    return Searchregion;
}