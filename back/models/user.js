module.exports = ( sequelize, DataTypes ) => {
    const User = sequelize.define( "User", {
        email : {
            type : DataTypes.STRING( 30 ),
            allowNull : false,
            unique : true
        },

        photo : {
            type : DataTypes.STRING( 200 ),
            allowNull : true,
        },

        intro : {
            type : DataTypes.STRING( 200 ),
            allowNull : true,
        },

        nickname : {
            type : DataTypes.STRING( 40 ),
            allowNull : false,
        },

        password : {
            type : DataTypes.STRING( 100 ),
            allowNull : false,
        },

        birth : {
            type : DataTypes.STRING( 20 ),
            allowNull : false,
        },

        username : {
            type : DataTypes.STRING( 10 ),
            allowNull : false,
        },

        checked : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
        }

    }, {
        charset : "utf8",
        collate : "utf8_general_ci"
    });

    User.associate = ( db ) => {

    };

    return User;
}