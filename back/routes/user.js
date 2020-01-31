
const express = require( "express" );
const bcrypt = require( "bcrypt" );
const passport = require( "passport" );
const db = require( "../models")
const path = require( "path" );
const multer = require( "multer" );
const fs = require( "fs" );
const router = express.Router();
const AWS = require( "aws-sdk" );
const multerS3 = require( "multer-s3" );
const sequelize = require( "sequelize" );

const prod = process.env.NODE_ENV === "production";
let upload;
if( prod ){
    AWS.config.update({
        region : "ap-northeast-2",
        accessKeyId : process.env.S3_ACCESS_KEY_ID,
        secretAccessKey : process.env.S3_SECRET_ACCESS_KEY
    });

    upload = multer({
        storage : multerS3({
            s3 : new AWS.S3(),
            bucket : "gagoboja",
            key( req, file, cb ){
                cb( null, `original/${ Date.now()}${ path.basename( file.originalname)}`);
            }
        })
    });
}else{
    // dev
    upload = multer({
        storage : multer.diskStorage({
            destination( req, file, done ){
                done( null, "uploads" );
            },
    
            filename( req, file, done ){
                const ext = ".jpg";
                const basename = path.basename( file.originalname, ext );
                const filename = basename + Date.now() + ext;
                done( null, filename );
            }
        })
    });
}

router.get( "/", ( req, res, next ) => {
    const user = req.user;
    res.json( user );
});

router.get( "/likeuser", async ( req, res, next ) => {

    try{

        const likeUser = await db.User.findAll({
            include : [{
                model : db.Post,
                as : "Liked",
                duplicating: false,
                required: true,
                attributes : [
                    "id",
                ],
            }],

            attributes : [
                "id", "nickname", "photo",
                [ sequelize.fn( "COUNT", sequelize.col( "Liked.Like.PostId" )), "count" ]
            ],

            group : [ "Liked.Like.PostId" ],
            order : [
                [ sequelize.literal( "count DESC" )],
                [ "createdAt", "DESC" ]
            ],

            offset : 0,
            limit : 6,
        });

        res.json( likeUser );

    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.get( "/best", async ( req, res, next ) => {

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

        res.json( bestUser );

    }catch( error ){
        console.error( error );
        next( error );
    }

});

router.get( "/:id", async ( req, res, next ) => {
    try{
        const other = await db.User.findOne({
            where : {
                id : req.params.id,
            },

            include : [{
                model : db.Post,
                as : "Posts",
                attributes : [
                    "id",
                    "title",
                    "content",
                    "src"
                ],

                include : [{
                    model : db.User,
                    as : "Likers",
                    attributes : [ "id" ]
                }]
            }, {
                model : db.User,
                as : "Guiding",
                attributes : [ "id" ]
            }, {
                model : db.User,
                as : "Guider",
                attributes : [ "id" ]
            }, {
                model : db.Post,
                as : "Shared",
                attributes : [
                    "id",
                    "title",
                    "content",
                    "src"
                ],

                include : [{
                    model : db.User,
                    as : "Likers",
                    attributes : [ "id" ]
                }]
            }],

            attributes : [
                "nickname",
                "intro",
                "photo",
                "id",
            ]
        });

        res.json( other );

    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.post( "/uploadPhoto", upload.single( "image" ), async ( req, res, next ) => {
    try{
        // if( req.user.photo ){
        //     await fs.unlinkSync( `./uploads/${ req.user.photo }` );
        // }

        let file;
        if( prod ){
            file = req.file.location;
        }else{
            file = req.file.filename;
        }

        await db.User.update({
            photo : file,
        }, {
            where : {
                id : req.user.id
            }
        });

        const user = await db.User.findOne({
            where : {
                id : req.user.id
            },

            attributes : [
                "photo"
            ]
        });

        res.send( user );
    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.post( "/infochange", async ( req, res, next ) => {

    try{
        await db.User.update({
            intro : req.body.intro
        }, {
            where : {
                id : req.user.id
            }
        });

        const user = await db.User.findOne({
            where : {
                id : req.body.id
            },

            include : [{
                model : db.User,
                as : "Guiding",
                attributes : [ "id" ],
            }, {
                model : db.User,
                as : "Guider",
                attributes : [ "id" ]
            }]
        });

        res.json( user );
    }catch( error ){
        console.error( error );
        next( error );
    }
    
});

router.post( "/signup", async ( req, res, next ) => {
    try{
        const exUser = await db.User.findOne({
            where : {
                email : req.body.email
            }
        });

        if( exUser ){
            return res.status( 403 ).json({
                errorCode : 1,
                message : '이미 회원 가입되어 있습니다.'
            });
        }

        const hash = await bcrypt.hash( req.body.password, 12 );
        const newUser = await db.User.create({
            email : req.body.email,
            password : hash,
            nickname : req.body.nickname,
            birth : req.body.birth,
            username : req.body.username,
            checked : req.body.checked,
        });

        // 200 성공
        // 201 성공적으로 생성
        // HTTP STATUS CODE 검색해봐~
        res.status( 201 ).json( newUser );

    }catch( err ){
        console.log( err );
        next( err );
    }
});

router.post( "/login", ( req, res, next ) => {

    passport.authenticate( "local", ( error, user, info ) => {  

        if( error ){
            console.error( error );
            return next( error );
        }

        if( info ){
            // 401 서버에서 거절
            return res.status( 401 ).send( info.reason );
        }

        return req.login( user, async ( error ) => { // 세션에 사용자 정보 저장
            if( error ){
                console.error( error );
                return next( error );
            }

            const fullUser = await db.User.findOne({
                where : { 
                    id : user.id 
                },

                include : [{
                    model : db.User,
                    as : "Guiding",
                    attributes : [ "id" ]
                }, {
                    model : db.User,
                    as : "Guider",
                    attributes : [ "id" ]
                }],

                attributes : [
                    "birth", "id", "intro", "nickname", "photo"
                ]
            });

            return res.json( fullUser );
        });

    })( req, res, next );
});

router.post( "/logout", ( req, res, next ) => {
    if( req.isAuthenticated() ){
        req.logout();
        req.session.destroy();
        return res.status( 200 ).send( "로그아웃 되었습니다." );
    }
});

router.post( "/:id/guide", async ( req, res, next ) => {
    try{

        const user = await db.User.findOne({
            where : {
                id : req.user.id
            }
        });

        await user.addGuiding( req.params.id );
        res.send( req.params.id );

    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.delete( "/:id/unguide", async ( req, res, next ) => {
    try{
        const user = await db.User.findOne({
            where : {
                id : req.user.id
            }
        });

        await user.removeGuiding( req.params.id );
        res.send( req.params.id );
    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.delete( "/:id/unguider", async ( req, res, next ) => {
    try{
        const user = await db.User.findOne({
            where : {
                id : req.user.id
            }
        });

        await user.removeGuider( req.params.id );
        res.send( req.params.id );
    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.get( "/:id/guidings", async ( req, res, next ) => {
    try{
        const user = await db.User.findOne({
            where : {
                id : req.params.id
            }
        });

        const guidings = await user.getGuiding({
            attributes : [
                "id", "nickname", "photo"
            ]
        });

        res.json( guidings );

    }catch( error ){
        console.error( error );
        next( error );
    }
});

router.get( "/:id/guiders", async ( req, res, next ) => {

    try{
        const user = await db.User.findOne({
            where : {
                id : req.params.id
            }
        });

        const guiders = await user.getGuider({
            attributes : [
                "id", "nickname", "photo"
            ]
        });

        res.json( guiders );

    }catch( error ){
        console.error( error );
        next( error );
    }
});


module.exports = router;