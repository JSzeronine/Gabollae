
const express = require( "express" );
const cors = require( "cors" );
const passport = require( "passport" );
const session = require( "express-session" );
const cookie = require( "cookie-parser" );

const prod = process.env.NODE_ENV === "production";
const db = require( "./models" );
const passportConfig = require( "./passport" );
const morgan = require( "morgan" );
const hpp = require( "hpp" );
const helmet = require( "helmet" );
const dotenv = require( "dotenv" );

const app = express();

dotenv.config();
db.sequelize.sync();
passportConfig();

const userRouter = require( "./routes/user" );
const postRouter = require( "./routes/post" );
const otherRouter = require( "./routes/other" );
const testRouter = require( "./routes/test" );
if( prod ){
    app.use( helmet() );
    app.use( hpp() );
    app.use( morgan( "combined" ) );
    app.use( cors({
        origin : "http://gagoboja.com",
        credentials : true,
    }));
}else{
    app.use( morgan( "dev" ) );
    app.use( cors({
        // origin : "http://localhost:3080",
        origin : "http://192.168.100.90:3080",
        credentials : true,
    }));
}

app.use( '/', express.static( 'uploads' ));
app.use( express.json() );
app.use( express.urlencoded({ extended : false }));
app.use( cookie( process.env.COOKIE_SECRET ));
app.use( session({ 
    resave : false, 
    saveUninitialized : false, 
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
        domain : prod && ".gagoboja.com",
    }
}));

app.use( passport.initialize() );
app.use( passport.session() );

app.get( "/", ( req, res ) => {
    res.send( "Back" );
});

app.use( "/user", userRouter );
app.use( "/post", postRouter );
app.use( "/other", otherRouter );
app.use( "/test", testRouter );

app.listen( prod ? process.env.PORT : 3085, () => {
    console.log( `백엔드 서버 ${ prod ? process.env.PORT : 3085 }번 포트에서 작동중.` );
});

// 404 NOT FOUND
app.use(( req, res, next ) => {
    res.status( 404 ).send( "NOT FOUND" );
});








