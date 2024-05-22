const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Movie',{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
          },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trailer:{
            type: DataTypes.STRING,
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        image:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        language:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        torrent:{
            type: DataTypes.JSONB,
            allowNull: false,
        },
        disabled:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }

    },
    {freezeTableName: true, timesStamp: true}
    );
};