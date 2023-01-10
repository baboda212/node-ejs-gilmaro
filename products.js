let {Sequelize, DataTypes} = require('sequelize');
let sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

let Products = sequelize.define('Products', {
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand_kr: {
        type: DataTypes.STRING,
        allowNull: false
    },
    brand_en: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type_1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type_2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    auto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    selling: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = {sequelize, Products};