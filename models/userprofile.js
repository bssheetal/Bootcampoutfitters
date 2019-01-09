module.exports = function (sequelize, DataTypes) {
    var Userprofile = sequelize.define("Userprofile", {

        city: DataTypes.STRING,
        activities: DataTypes.STRING,
        activities_complete: DataTypes.BOOLEAN
        
    });
    return Userprofile;
}