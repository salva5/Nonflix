const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Review',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating:{
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {min: 1, max: 10},
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