
export const state = () => ({
    all : [],
    list : [],
    other : null,
    title : null,
    content : null,
    hashtags : [],
    images : [],
    comments : [
        {
            photo : "/images/common/profile.png",
            nickname : "Zeronine",
            comment : "재밌어 보여요~"
        }
    ],
});

export const mutations = {
    loadPost( state, $data ){
        state.title = $data.title;
        state.content = $data.content;
        state.images = $data.Images;
        state.hashtags = $data.Hashtags;
        state.other = $data.User;
    },

    loadAllUserPost( state, $data ){
        state.list = $data;
    },

    loadAllPost( state, $data ){
        state.all = $data;
    }
}

export const actions = {
    uploadImages({ commit }, $data ){
        return new Promise(( resolve, reject ) => {
            this.$axios.post( "/post/images", $data, {
                withCredentials : true,
            }).then(( result ) => {
                resolve( result );
            }).catch(( error ) => {
                reject();
            });
        });
    },

    write({ commit }, $data ){
        return new Promise(( resolve, reject ) => {
            this.$axios.post( "/post/write", $data, {
                withCredentials : true,
            }).then(( result ) => {
                resolve( result );
            }).catch(( error ) => {

            });
        });
    },

    async loadPost({ commit }, $data ){
        const post = await this.$axios.get( `/post/${ $data.postId }`, { withCredentials : true } );
        commit( "loadPost", post.data );
    },

    async loadAllUserPost({ commit, state }){
        const allUserPost = await this.$axios.get( `/post/user/${ state.other.id }`, { withCredentials : true });
        commit( "loadAllUserPost", allUserPost.data );
    },

    async allPost({ commit }){
        const allUserPost = await this.$axios.get( `/post/all`, { withCredentials : true });
        commit( "loadAllPost", allUserPost.data );
    },
}

