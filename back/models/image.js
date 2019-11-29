module.exports = ( sequelize, DataTypes ) => {
    const Image = sequelize.define( "Image", {
        src : {
            type : DataTypes.STRING( 200 ),
            allowNull : false,
        },

        w : {
            type : DataTypes.DOUBLE,
            allowNull : false,
        },

        message : {
            type : DataTypes.TEXT,
            allowNull : true,
        },

        emoticon : {
            type : DataTypes.STRING( 200 ),
            allowNull : true,
        },

        lat : {
            type : DataTypes.DOUBLE,
            allowNull : true,
        },

        lng : {
            type : DataTypes.DOUBLE,
            allowNull : true,
        },

        view : {
            type : DataTypes.BOOLEAN,
            allowNull : false
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

