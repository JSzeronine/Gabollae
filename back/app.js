
const express = require( "express" );
const cors = require( "cors" );
const bcrypt = require( "bcrypt" );
const passport = require( "passport" );
const session = require( "express-session" );
const cookie = require( "cookie-parser" );

const db = require( "./models" );
const passportConfig = require( "./passport" );
const morgan = require( "morgan" );

const app = express();

db.sequelize.sync();
passportConfig();

app.use( morgan( "dev" ) );
app.use( cors({
    origin : "http://localhost:3080",
    credentials : true,
}));

app.use( express.json() );
app.use( express.urlencoded({ extended : false }));
app.use( cookie() );
app.use( session({
    resave : false,
    saveUninitialized : false,
    secret : "cookiesecret",
    cookie : {
        httpOnly : true,
        secure : false
    }
}));

app.use( passport.initialize() );
app.use( passport.session() );

app.get( "/", ( req, res ) => {
    res.send( "안녕 시퀄라이즈" );
});




app.get( "/user/info", ( req, res, next ) => {

    if( !req.isAuthenticated() ){
        console.log( "유저 없음" );
        return;
    }

    const user = req.user;
    res.status( 201 ).json( user );
});

app.post( "/user", async ( req, res, next ) => {
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

app.post( "/user/login", ( req, res, next ) => {

    console.log( req.body.email );
    console.log( req.body.password );
    console.log( req.body.checked );

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

app.listen( 3085, () => {
    console.log( `백엔드 서버 ${ 3085 }번 포트에서 작동중.`)
});

