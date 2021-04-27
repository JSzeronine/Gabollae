const express = require( "express" );
const multer = require( "multer" );
const router = express.Router();
const path = require( "path" );
const db = require( "../models" );
const fs = require( "fs" );
const AWS = require( "aws-sdk" );
const multerS3 = require( "multer-s3" );
const prod = process.env.NODE_ENV === "production";
const sequelize = require( "sequelize" );

let upload;
if( prod ){
    console.log( "1" );
    // AWS.config.update({
    //     region : "ap-northeast-2",
    //     accessKeyId : process.env.S3_ACCESS_KEY_ID,
    //     secretAccessKey : process.env.S3_SECRET_ACCESS_KEY
    // });
    //
    // upload = multer({
    //     storage : multerS3({
    //         s3 : new AWS.S3(),
    //         bucket : "gagoboja",
    //         key( req, file, cb ){
    //             cb( null, `original/${ path.basename( file.originalname )}${ Date.now() }.jpg`);
    //         }
    //     })
    // })

    upload = multer({
        storage : multer.diskStorage({
            destination( req, file, done ){
                console.log( "업로드 시작" );
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

}else{
    console.log( "2" );
    // dev
    upload = multer({
        storage : multer.diskStorage({
            destination( req, file, done ){
                console.log( "업로드 시작" );
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
}

router.get( "/allhashtag", async ( req, res, next ) => {

    try{
        const hashtags = await db.Hashtag.findAll({
            order : [
                [ "count", "DESC" ]
            ],

            offset : 0,
            limit : 6,
        })

        return res.json( hashtags );

    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.post( "/images", upload.array( "image" ), ( req, res ) => {
    if( prod ){
        res.json( req.files.map( v => v.location ));
    }else{
        res.json( req.files.map( v => v.filename ));
    }
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
            const result = await Promise.all( hashtags.map( async ( $tag ) => {

                let tag = await db.Hashtag.findOne({
                    where : {
                        content : $tag.slice( 1 ).toLowerCase()
                    }
                });

                if( tag ){
                    let tCount = tag.count + 1;
                    await tag.update({
                        count : tCount
                    });
                }

                return db.Hashtag.findOrCreate({
                    where : {
                        content : $tag.slice( 1 ).toLowerCase(),
                    },

                    defaults : {
                        content : $tag.slice( 1 ).toLowerCase(),
                        count : 1
                    }
                });
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
                        marker : image.marker,
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
                    marker : image.marker,
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

router.get( "/hit", async( req, res, next ) => {

    // SELECT *
    // FROM (
    //     SELECT PostId, COUNT(1) AS CNT
    //     FROM gagoboja.like
    //     GROUP BY PostId
    // ) AS A
    // ORDER BY A.CNT DESC

    try{

        const hitPost = await db.Post.findAll({
            include : [{ 
                model : db.User, 
                as : "Likers", 
                duplicating: false,
                required: true,
                attributes : [
                    "id",
                ],

                through : {
                    attributes : [
                        "PostId",
                        "UserId"
                    ]
                }
            }, {
                model : db.User
            }],

            attributes : {
                include : [
                    [ sequelize.fn( "COUNT", sequelize.col( "Likers.Like.PostId" )), "count" ]
                ],
            },

            group : [ "Likers.Like.PostId" ],
            order : [
                [ sequelize.literal( "count DESC" )],
                [ "createdAt", "DESC" ]
            ],

            offset : 0,
            limit : 6,
        });

        let i = 0;
        let len = hitPost.length;
        let posts = [];

        for( i; i<len; i++ )
        {
            let post = await db.Post.findOne({
                where : {
                    id : hitPost[ i ].id,
                },

                include : [{
                    model : db.User,
                }, {
                    model : db.User,
                    as : "Likers"
                }]
            });

            posts.push( post );
        }

        res.json( posts );
        
    }catch( error ){
        console.error( error );
        next( error );
    }

});
router.get( "/allhit", async ( req, res, next ) => {
    try{
        const hitPost = await db.Post.findAll({
            include : [{ 
                model : db.User, 
                as : "Likers", 
                required: true,
                attributes : [ "id", ],
                through : {
                    attributes : [
                        "PostId",
                        "UserId"
                    ]
                }
            }, {
                model : db.User
            }],

            attributes : {
                include : [
                    [ sequelize.fn( "COUNT", sequelize.col( "Likers.Like.PostId" )), "count" ]
                ],
            },

            group : [ "Likers.Like.PostId" ],
            order : [
                [ sequelize.literal( "count DESC" )],
                [ "createdAt", "DESC" ]
            ],
        });

        let i = 0;
        let len = hitPost.length;
        let posts = [];

        for( i; i<len; i++ )
        {
            let post = await db.Post.findOne({
                where : {
                    id : hitPost[ i ].id,
                },

                include : [{
                    model : db.User,
                }, {
                    model : db.User,
                    as : "Likers"
                }]
            });

            posts.push( post );
        }

        res.json( posts );
        
    }catch( error ){
        console.error( error );
        next( error );
    }
});
















router.get( "/new", async ( req, res, next ) => {
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

            attributes : [ 
                "id", 
                "src", 
                "title", 
                "content", 
                "createdAt" 
            ],

            order : [[ "createdAt", "DESC" ]],
            offset : 0,
            limit : 6
        });

        res.json( allPost );

    }catch( error ){

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

            attributes : [ 
                "id", 
                "src", 
                "title", 
                "content", 
                "createdAt" 
            ],

            order : [[ "createdAt", "DESC" ]],
            // offset : 0,
            // limit : 6
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
                    "marker",
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
            }, {
                model : db.User,
                as : "Shares",
                attributes : [ "id" ]
            }],

            attributes : [ "id", "src", "title", "content", "createdAt" ]
        });

        return res.json( post );

    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.get( "/hashtag/:tag", async ( req, res, next ) => {

    try{
        const hashtag = await db.Hashtag.findOne({
            where : {
                content : decodeURIComponent( req.params.tag ),
            },

            include:[{
                model : db.Post,
                attributes : [ "id", "title", "content", "src", "createdAt" ],

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

        let i = 0;
        let len = post.Images.length;
        let image;

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

router.post( "/:id/share", async ( req, res, next ) => {
    try{
        const post = await db.Post.findOne({
            where : {
                id : req.params.id
            }
        });

        if( !post ){
            return res.status( 404 ).send( "포스트가 존재하지 않습니다." );
        }

        await post.addShare( req.user.id );
        res.json({
            userId : req.user.id 
        });

    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.delete( "/:id/share", async ( req, res, next ) => {
    try{
        const post = await db.Post.findOne({
            where : {
                id : req.params.id
            }
        });

        if( !post ){
            return res.status( 404 ).send( "포스트가 존재하지 않습니다." );
        }

        await post.removeShare( req.user.id );
        res.json({
            userId : req.user.id 
        });

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

        await post.update({
            title : req.body.data.title,
            content : req.body.data.content,
            src : req.body.data.Images[ 0 ].src
        });

        await post.Images.map( v => v.destroy() );
        await post.Hashtags.map( v => v.PostHashtag.destroy() );

        const hashtags = req.body.data.Hashtags.match( /#[^\s#]+/g );
        if( hashtags ){
            const result = await Promise.all( hashtags.map(( $tag ) => {
                return db.Hashtag.findOrCreate({
                    where : {
                        content : $tag.slice( 1 ).toLowerCase()
                    },

                    defaults : {
                        content : $tag.slice( 1 ).toLowerCase(),
                        count : 1
                    }
                });
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
                        marker : image.marker,
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
                    marker : image.marker,
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
