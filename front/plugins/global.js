export default{
    install( Vue ){
        if( process.env.NODE_ENV === "production" ){
            Vue.prototype.getResourceURL = "";
        }else{
            Vue.prototype.getResourceURL = "http://localhost:3085/";
        }
    }
}