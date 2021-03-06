module.exports = ( sequelize, DataTypes ) => {
    const Post = sequelize.define( "Post", {
        title : {
            type : DataTypes.TEXT,
            allowNull : false,
        },

        content : {
            type : DataTypes.TEXT,
            allowNull : false,
        },

        src : {
            type : DataTypes.STRING( 200 ),
            allowNull : false,
        },
    }, {
        charset : "utf8mb4",
        collate : "utf8mb4_general_ci"
    });

    Post.associate = ( db ) => {
        db.Post.belongsTo( db.User );
        db.Post.hasMany( db.Comment );
        db.Post.hasMany( db.Image );
        db.Post.belongsToMany( db.User, { through : "Like", as : "Likers" });
        db.Post.belongsToMany( db.User, { through : "Share", as : "Shares" });

        db.Post.belongsToMany( db.Hashtag, { through : "PostHashtag" });
    };

    return Post;
}