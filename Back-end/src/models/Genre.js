const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Genre',{
        id: {
            type:DataTypes.STRING,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {freezeTableName: true, timesStamp: false}
    );
};