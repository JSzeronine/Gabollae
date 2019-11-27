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
            type : DataTypes.TEXT,
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
        charset : "utf8mb4",
        collate : "utf8mb4_general_ci"
    });

    User.associate = ( db ) => {
        db.User.hasMany( db.Post );
        db.User.hasMany( db.Comment );
        db.User.belongsToMany( db.Post, { through : "Like", as : "Liked" });
        db.User.belongsToMany( db.User, { through : "Guide", as : "Guider", foreignKey : "GuidingId" });
        db.User.belongsToMany( db.User, { through : "Guide", as : "Guiding", foreignKey : "GuiderId" });
    };

    return User;
}