const passport = require( "passport" );
const { Strategy : LocalStorage } = require( "passport-local" );
const db = require( "../models" );
const bcrypt = require( "bcrypt" );

module.exports = () => {
    passport.use( new LocalStorage({

        usernameField : 'email',
        passwordField : 'password'

    }, async ( email, password, done ) => {

        try{
            const exUser = await db.User.findOne({
                where : { email }
            });

            console.log( "==================" );
            console.log( email );
            console.log( "==================" );
    
            if( !exUser ){
                // 에러, 성공, 실패
                return done( null, false, { reason : "존재하지 않는 사용자입니다." });
            }

            const result = await bcrypt.compare( password, exUser.password );

            if( result ){
                return done( null, exUser );
            }else{
                return done( null, false, { reason : "비밀번호가 틀립니다." });
            }
        }catch( error ){
            console.error( error );
            return done( error );
        }
    }));
}