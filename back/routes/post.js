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
                        view : image.view,
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
                    view : image.view,
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
                    "photo",
                ]
            }, {
                model : db.User,
                as : "Likers",
                attributes : [
                    "id"
                ]
            }],

            attributes : [ "id", "src", "title", "content", "createdAt" ]
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

            include : [{
                model : db.User,
                attributes : [
                    "id",
                    "nickname",
                ]
            }, {
                model : db.User,
                as : "Likers",
                attributes : [ "id" ]
            }],

            order : [[ "createdAt", "DESC" ]],
            attributes : [ "id", "src", "title", "content" ]
        });

        res.json( allUserPost );

    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.get( "/:id/comments", async ( req, res, next ) => {

    try{
        const post = await db.Post.findOne({
            where : {
                id : req.params.id
            }
        });

        if( !post ){
            return res.status( 404 ).send( "포스트가 존재하지 않습니다." );
        }

        const comments = await db.Comment.findAll({
            where : {
                PostId : req.params.id,
            },

            include : [{
                model : db.User,
                attributes : [ "id", "nickname", "photo" ],
            }],

            // attributes : [
                // "content",
                // [ db.sequelize.fn( "left", db.sequelize.col( "createdAt" ), 10 ), "date" ]
            // ],

            order : [[ "createdAt", "DESC" ]]
        });

        res.json( comments );

    }catch( error ){
        console.error( error );
        next( error );
    }

});

router.post( "/:id/comment", async ( req, res, next ) => {

    try{

        const post = await db.Post.findOne({
            where : {
                id : req.params.id
            }
        });

        if( !post ){
            return res.status( 404 ).send( "포스트가 존재하지 않습니다." );
        }

        const newComment = await db.Comment.create({
            PostId : post.id,
            UserId : req.user.id,
            content : req.body.content
        });

        const comments = await db.Comment.findOne({
            where : {
                id : newComment.id,
            },

            include : [{
                model : db.User,
                attributes : [
                    "id", "nickname", "photo"
                ]
            }]
        });

        return res.json( comments );

    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.delete( "/:id/comments", async ( req, res, next ) => {
    try{
        await db.Comment.destroy({
            where : {
                id : req.params.id
            }
        });

        res.send( "Comment가 삭제 되었습니다." );
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
                    "view",
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
                ],

                include : [{
                    model : db.User,
                    as : "Guiding", 
                    attributes : [ "id" ],
                }, {
                    model : db.User,
                    as : "Guider",
                    attributes : [ "id" ]
                }]
            }, {
                model : db.User,
                as : "Likers",
                attributes : [ "id" ]
            }],

            attributes : [ "id", "src", "title", "content" ]
        });

        return res.json( post );

    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.get( "/hashtag/:tag", async ( req, res, next ) => {

    console.log( req.params.id );

    try{
        hashtag = await db.Hashtag.findOne({
            where : {
                content : decodeURIComponent( req.params.tag ),
            },

            include:[{
                model : db.Post,
                attributes : [ "id", "title", "content", "src" ],

                include : [{
                    model : db.User,
                    attributes : [
                        "photo",
                        "nickname",
                        "id",
                    ]
                }, {
                    model : db.User,
                    as : "Likers",
                }]
            }]
        });

        return res.status( 201 ).json( hashtag );

    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.post( "/:id/like", async ( req, res, next ) => {
    try{
        const post = await db.Post.findOne({
            where : {
                id : req.params.id
            }
        });

        if( !post ){
            return res.status( 404 ).send( "포스트가 존재하지 않습니다." );
        }

        await post.addLiker( req.user.id );
        res.json({
            userId : req.user.id 
        });

    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.delete( "/:id/like", async ( req, res, next ) => {
    try{
        const post = await db.Post.findOne({
            where : {
                id : req.params.id
            }
        });

        if( !post ){
            return res.status( 404 ).send( "포스트가 존재하지 않습니다." );
        }

        await post.removeLiker( req.user.id );
        res.json({
            userId : req.user.id 
        });

    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.delete( "/:id/remove", async ( req, res, next ) => {
    try{
        const post = await db.Post.findOne({
            where : {
                id : req.params.id
            },

            include : [
                { model : db.Image }, 
                { model : db.Hashtag },
                { model : db.Comment }
            ]
        });

        await post.Images.map( v => v.destroy() );
        await post.Hashtags.map( v => v.PostHashtag.destroy() );
        await post.removeLiker( req.user.id );
        await post.Comments.map( v => v.destroy() );
        await post.destroy();

        res.status( 201 ).send( "성공적으로 삭제 하였습니다." );

    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.post( "/:id/revision", async ( req, res, next ) => {
    try{
        const post = await db.Post.findOne({
            where : {
                id : req.params.id
            },

            include : [{
                model : db.Image,
            }, {
                model : db.Hashtag,
            }],
        });

        post.update({
            title : req.body.data.title,
            content : req.body.data.content
        });

        await post.Images.map( v => v.destroy() );
        await post.Hashtags.map( v => v.PostHashtag.destroy() );

        const hashtags = req.body.data.Hashtags.match( /#[^\s#]+/g );
        if( hashtags ){
            const result = await Promise.all( hashtags.map(( $tag ) => {
                return db.Hashtag.findOrCreate({
                    where : {
                        content : $tag.slice( 1 ).toLowerCase()
                    }
                })
            }));

            await post.addHashtags( result.map( r => r[ 0 ] ));
        }

        if( req.body.data.Images ){
            if( Array.isArray( req.body.data.Images )){
                await Promise.all( req.body.data.Images.map(( image ) => {
                    return db.Image.create({
                        src : image.src,
                        w : image.w,
                        emoticon : image.emoticon,
                        lat : image.lat,
                        lng : image.lng,
                        view : image.view,
                        message : image.message,
                        PostId : post.id
                    })
                }));
            }else{
                await db.Image.create({
                    src : image.src,
                    w : image.w,
                    emoticon : image.emoticon,
                    lat : image.lat,
                    lng : image.lng,
                    view : image.view,
                    message : image.message,
                    PostId : post.id
                });
            }
        }

        res.status( 201 ).send( "성공적으로 수정 하였습니다." );
    }catch( error ){
        console.error( error );
        next( error );
    }
});

module.exports = router;
