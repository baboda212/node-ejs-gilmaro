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

// 테이블 생성
const Order = sequelize.define('Order', {
    // create(속성 정의)
    name: {
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue:''
    },
    email: {
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue:''
    },
    phone: {
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue:''
    },
    title: {
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue:''
    },
    detail: {
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue:''
    }
})

// 회원가입 테이블
const User = sequelize.define('User', {
    userIds: {
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue:'',
    },
    userPwd: {
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue:'',
    },
    userEmail: {
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue:'',
    },
    userPhone: {
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue:'',
    },
    userName: {
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue:'',
    },
    userCart: {
        type:DataTypes.STRING,
        allowNull: true,
    }

})

module.exports = {sequelize, Products, Order, User};