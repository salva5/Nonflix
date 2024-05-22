const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        provider:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        admin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        image:{
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {freezeTableName: true, timesStamp: true}
    );
};