const express = require( "express" );
const router = express.Router();
const db = require( "../models")
const sequelize = require( "sequelize" );

router.get( "/grouptest", async ( req, res, next ) => {
    try{
        const bestUser = await db.User.findAll({
            include : [{
                model : db.Post,
                attributes : [ "id" ]
            }],

            attributes : [
                // include : [
                    "id", "nickname", "photo",
                    [ sequelize.fn( "COUNT", sequelize.col( "Posts.UserId" )), "count" ]
                // ]
            ],

            group : [ "Posts.UserId" ],
            order : [[ sequelize.literal( "count DESC" )]]
        });

        const hitPost = await db.Post.findAll({
            include : [{
                model : db.User,
                as : "Likers"
            }],

            attributes : [
                "id", "title",
            ]
        });

        res.json({
            bestUser : bestUser,
            hitPost : hitPost
        });
    }catch( error ){
        console.error( error );
        next( error );
    }
});

module.exports = router;