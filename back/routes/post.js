const express = require( "express" );
const multer = require( "multer" );
const router = express.Router();
const path = require( "path" );
const db = require( "../models" );

const upload = multer({
    storage : multer.diskStorage({
        destination( req, file, done ){
            done( null, "uploads" );
        },

        filename( req, file, done ){
            // const ext = path.extname( file.originalname );  // 확장자
            const ext = ".jpg";
            const basename = path.basename( file.originalname, ext );
            const filename = basename + Date.now() + ext;
            done( null, filename );
        }
    })
});

router.post( "/images", upload.array( "image" ), ( req, res ) => {
    res.json( req.files.map( v => v.filename ));
});

router.post( "/write", async ( req, res, next ) => {

    try{

        const newPost = await db.Post.create({
            title : req.body.title,
            content : req.body.content,
            src : req.body.images[ 0 ].src,
            UserId : req.user.id,
        });

        const hashtags = req.body.hashTag.match( /#[^\s#]+/g );
        if( hashtags ){
            const result = await Promise.all( hashtags.map(( $tag ) => {
                return db.Hashtag.findOrCreate({
                    where : {
                        content : $tag.slice( 1 ).toLowerCase()
                    }
                })
            }));

            await newPost.addHashtags( result.map( r => r[ 0 ] ));
        }

        if( req.body.images ){
            if( Array.isArray( req.body.images )){
                await Promise.all( req.body.images.map(( image ) => {
                    return db.Image.create({
                        src : image.src,
                        w : image.w,
                        emoticon : image.emoticon,
                        lat : image.lat,
                        lng : image.lng,
                        message : image.message,
                        PostId : newPost.id
                    })
                }));
            }else{
                await db.Image.create({
                    src : image.src,
                    w : image.w,
                    emoticon : image.emoticon,
                    lat : image.lat,
                    lng : image.lng,
                    message : image.message,
                    PostId : newPost.id
                });
            }
        }

        res.status( 201 ).json({
            postId : newPost.id
        });

    }catch( error ){
        console.error( error );
        next( error );
    }
});


router.get( "/all", async ( req, res, next ) => {
    try{
        
        const allPost = await db.Post.findAll({
            include : [{
                model : db.User,
                attributes : [
                    "id",
                    "nickname",
                    "intro",
                    "photo"
                ]
            }],

            attributes : [ "id", "src", "title", "content" ]
        });

        res.json( allPost );

    }catch( error ){

    }
});

router.get( "/user/:id", async ( req, res, next ) => {
    try{
        const allUserPost = await db.Post.findAll({
            where : {
                UserId : req.params.id
            },

            attributes : [ "id", "src", "title", "content" ]
        });

        res.json( allUserPost );

    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.get( "/:id", async ( req, res, next ) => {

    try{
        const post = await db.Post.findOne({
            where : {
                id : req.params.id
            },

            include : [{
                model : db.Image,
                as : "Images",
                attributes : [ 
                    "id",
                    "src",
                    "w",
                    "message",
                    "emoticon",
                    "lat",
                    "lng"
                ],
            }, {
                model : db.Hashtag,
                as : "Hashtags",
                attributes : [
                    "id",
                    "content"
                ]
            }, {
                model : db.User,
                attributes : [
                    "id",
                    "nickname",
                    "intro",
                    "photo"
                ]
            }],

            attributes : [ "id", "src", "title", "content" ]
        });

        res.json( post );

    }catch( error ){
        console.error( error );
        next( error );
    }
});

module.exports = router;