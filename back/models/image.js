module.exports = ( sequelize, DataTypes ) => {
    const Image = sequelize.define( "Image", {
        src : {
            type : DataTypes.STRING( 200 ),
            allowNull : false,
        },

        message : {
            type : DataTypes.TEXT,
            allowNull : false,
        },

        emoticon : {
            type : DataTypes.STRING( 20 ),
            allowNull : false,
        },

        lat : {
            type : DataTypes.DOUBLE,
            allowNull : false,
        },

        lng : {
            type : DataTypes.DOUBLE,
            allowNull : false,
        }

    }, {
        charset : "utf8",
        collate : "utf8_general_ci",
    });

    Image.associate = ( db ) => {
        db.Image.belongsTo( db.Post );
    }

    return Image;
}

