const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Shop',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        total:{
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        articlesQt:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
       status:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        provider:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        mercadoPagoId:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {freezeTableName: true, timesStamp: true}
    );
};