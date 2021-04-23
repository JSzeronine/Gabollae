


export default{
    install( Vue ){
        if( process.env.NODE_ENV === "production" ){
            Vue.prototype.getResourceURL = "";
        }else{
            Vue.prototype.getResourceURL = "http://192.168.100.90:3085/";
        }

        Vue.prototype.goLink = {
            HOME : () => {
                Vue.prototype.setLink( `/` );
            },

            LOGIN : () => {
                Vue.prototype.setLink( `/login` );
            },

            USERPAGE : ( $userId ) => {
                Vue.prototype.setLink( `/users/${ $userId }/home` );
            },

            POST : ( $postId ) => {
                Vue.prototype.setLink( `/post/${ $postId }` );
            },

            HASHTAG : ( $tag ) => {
                Vue.prototype.setLink( `/hashtag/${ $tag }` );
            },

            REVISION : ( $postId ) => {
                Vue.prototype.setLink( `/revision/${ $postId }` );
            },
        },

        Vue.prototype.setLink = ( $url ) => Vue.prototype.$nuxt.$router.push( $url );
    }
}