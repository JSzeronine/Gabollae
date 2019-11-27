const passport = require( "passport" );
const local = require( "./local" );
const db = require( "../models" );

module.exports = () => {

    passport.serializeUser(( user, done ) => {
        return done( null, user.id );
    });

    passport.deserializeUser( async ( id, done ) => {
        try{
            const user = await db.User.findOne({
                where : { id },
                include : [{
                    model : db.Post,
                    as : "Posts",
                    attributes : [
                        "id",
                        "title",
                        "content",
                        "src"
                    ]
                }, {
                    model : db.User,
                    as : "Guider",
                    attributes : [
                        "id"
                    ]
                }, {
                    model : db.User,
                    as : "Guiding",
                    attributes : [
                        "id"
                    ]
                }],

                attributes : [
                    "birth", "id", "intro", "nickname", "photo"
                ]
            });

            return done( null, user );
        }catch( error ){
            console.error( error );
            return done( error );
        }
    });

    local();
};