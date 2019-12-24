import Find from '@/plugins/find';

export default{
    data(){
        return{
            email : "",
            userName : "",
            birth : "",
            nickname : "",
            password : "",
            passwordConfirm : "",
            checked : false
        }
    },

    methods : {
        signup(){
            if( !Find.getCheckEmail( this.email )){
                alert( "이메일이 잘못되었습니다." );
                return;
            }

            if( !this.userName ){
                alert( "이름을 작성해주세요." );
                return;
            }

            if( !this.birth ){
                alert( "생년월일이 잘못되었습니다." );
                return;
            }

            if( !this.nickname ){
                alert( "닉네임을 작성해주세요." );
                return;
            }

            if( !Find.getCheckPassword( this.email, this.password, this.passwordConfirm )){
                this.password = "";
                this.passwordConfirm = "";
                return;
            }

            if( !this.checked ){
                alert( "동의에 체크해주세요." );
                return;
            }

            this.$store.dispatch( "user/signup", {
                email : this.email,
                password : this.password,
                nickname : this.nickname,
                birth : this.birth,
                userName : this.userName,
                checked : this.checked,
            }).then(( $result ) => {
                console.log( $result );
                this.goLink.LOGIN();
            }).catch(( error ) => {
                console.error( error.message );
            })
        }
    }
}