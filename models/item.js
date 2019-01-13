module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT,
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    lengthOfTrail: DataTypes.FLOAT,
    difficulty: DataTypes.STRING,
    summary: DataTypes.STRING,
    ascent: DataTypes.INTEGER,
    descent: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    imagelink: DataTypes.STRING
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
