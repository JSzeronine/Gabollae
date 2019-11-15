
const express = require( "express" );
const cors = require( "cors" );
const passport = require( "passport" );
const session = require( "express-session" );
const cookie = require( "cookie-parser" );

const db = require( "./models" );
const passportConfig = require( "./passport" );
const morgan = require( "morgan" );

const app = express();

const userRouter = require( "./routes/user" );
const postRouter = require( "./routes/post" );
const otherRouter = require( "./routes/other" );

db.sequelize.sync();
passportConfig();

app.use( morgan( "dev" ) );
app.use( cors({
    origin : "http://localhost:3080",
    credentials : true,
}));

app.use( '/', express.static( 'uploads' ));
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

app.use( "/user", userRouter );
app.use( "/post", postRouter );
app.use( "/other", otherRouter );

app.get( "/", ( req, res ) => {
    res.send( "안녕 시퀄라이즈" );
});

app.listen( 3085, () => {
    console.log( `백엔드 서버 ${ 3085 }번 포트에서 작동중.`)
});

