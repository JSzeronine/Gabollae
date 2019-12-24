export default{
    data(){
        return{
            email : "",
            password : "",
            checked : false
        }
    },

    methods : {
        showLogin(){
            this.$store.dispatch( "user/login", {
                email : this.email,
                password : this.password,
                checked : this.checked,
            }).then(( $result ) => {
                this.goLink.HOME();
            }).catch(( error ) => {
                alert( error );
            });
        }
    }
}

