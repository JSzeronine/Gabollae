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
            this.$store.dispatch( "user/signup", {
                email : this.email,
                password : this.password,
                nickname : this.nickname,
                birth : this.birth,
                userName : this.userName,
                checked : this.checked,
            }).then(( $result ) => {
                this.$router.push( "/login" );
            })
        }
    }
}