module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    lengthOfTrail: DataTypes.FLOAT,
    difficulty: DataTypes.STRING,
    summary: DataTypes.STRING,
    ascent: DataTypes.INTEGER,
    descent: DataTypes.INTEGER
  });

  Example.associate = function(models) {
    models.Example.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Example;
};
