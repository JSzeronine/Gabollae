
const express = require( "express" );
const bcrypt = require( "bcrypt" );
const passport = require( "passport" );
const db = require( "../models")
const path = require( "path" );
const multer = require( "multer" );
const fs = require( "fs" );
const router = express.Router();

router.get( "/", ( req, res, next ) => {
    const user = req.user;
    res.json( user );
});

const upload = multer({
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

router.post( "/uploadPhoto", upload.single( "image" ), async ( req, res, next ) => {
    try{
        if( req.user.photo ){
            await fs.unlinkSync( `./uploads/${ req.user.photo }` );
        }

        await db.User.update({
            photo : req.file.filename,
        }, {
            where : {
                id : req.user.id
            }
        });

        const user = await db.User.findOne({
            where : {
                id : req.user.id
            }
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
            }
        });

        res.send( user );
    }catch( error ){
        console.error( error );
        next( error );
    }
    
});

router.post( "/", async ( req, res, next ) => {
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

            return res.json( user );
        });

    })( req, res, next );
});

module.exports = router;