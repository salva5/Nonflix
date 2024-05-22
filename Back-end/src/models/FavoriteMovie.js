const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('FavoriteMovie',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        userId:{
            type: DataTypes.UUID,
            allowNull: false,  
            references: {
                model: 'User',
                key: 'id',
            },
        },
        movieId: {
            type: DataTypes.UUID,
            allowNull: false,
            references:{
                model: 'Movie',
                key: 'id',
            },
        },
    },
    {freezeTableName: true, timesStamp: true}
    );
};