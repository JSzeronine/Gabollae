export const state = () => ({
    content : null,

    list : [],
    all : [],
    hashtag : null,
    comments : [],

    // id : null,
    // other : null,
    // title : null,
    // content : null,
    // images : [],
    // hashtags : [],
    // likers : [],
});

export const mutations = {
    setComments( state, $data ){
        state.comments = $data;
    },

    addComment( state, $data ){
        state.comments.unshift( $data );
    },

    removeComments( state, $data ){
        const index = state.comments.findIndex(( v ) => v.id === $data );
        state.comments.splice( index, 1 );
    },

    loadPost( state, $data ){
        state.content = $data;
    },

    loadAllUserPost( state, $data ){
        state.list = $data;
    },

    loadAllPost( state, $data ){
        state.all = $data;
    },

    loadHashtagPost( state, $data ){
        state.list = $data.Posts;
        state.hashtag = $data.content;
    },

    addLike( state, $data ){
        state.content.Likers.push({
            id : $data.userId
        });
    },

    removeLike( state, $data ){
        var index = state.content.Likers.findIndex( v => v.id === $data );
        state.content.Likers.splice( index, 1 );
    },
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

    async hashtag({ commit }, $data ){
        const posts = await this.$axios.get( `/post/hashtag/${ $data.hashtag }`);
        commit( "loadHashtagPost", posts.data );
    },

    async loadPost({ commit }, $data ){
        const post = await this.$axios.get( `/post/${ $data.postId }`, { withCredentials : true } );
        commit( "loadPost", post.data );
    },

    async loadAllUserPost({ commit, state }){
        const allUserPost = await this.$axios.get( `/post/user/${ state.content.User.id }`, { withCredentials : true });
        commit( "loadAllUserPost", allUserPost.data );
    },

    async loadAllMyPost({ commit, state }, $data ){
        const allUserPost = await this.$axios.get( `/post/user/${ $data.userId }`, { withCredentials : true });
        commit( "loadAllUserPost", allUserPost.data );
    },

    async allPost({ commit }){
        const allUserPost = await this.$axios.get( `/post/all`, { withCredentials : true });
        commit( "loadAllPost", allUserPost.data );
    },

    async addComment({ commit }, $data ){
        const comment = await this.$axios.post( `/post/${ $data.postId }/comment`, {
            content : $data.content
        }, { 
            withCredentials : true 
        });

        commit( "addComment", comment.data );
    },

    async removeComment({ commit }, $data ){
        await this.$axios.delete( `/post/${ $data.commentId }/comments`, { withCredentials : true });
        commit( "removeComments", $data.commentId );
    },

    async loadComment({ commit }, $data ){
        const comments = await this.$axios.get( `/post/${ $data.postId }/comments`, { withCredentials : true });
        commit( "setComments", comments.data );
    },

    async like({ commit }, $data ){
        const like = await this.$axios.post( `/post/${ $data.postId }/like`, {
            
        }, {
            withCredentials : true,
        });

        commit( "addLike", like.data );
    },

    async unlike({ commit }, $data ){
        const like = await this.$axios.delete( `/post/${ $data.postId }/like`, {
            withCredentials : true,
        });

        commit( "removeLike", like.data );
    },

    revision({ commit }, $data ){
        return new Promise(( resolve, reject ) => {
            this.$axios.post( `/post/${ $data.data.id }/revision`,{
                data : $data.data
            }, {
                withCredentials : true,
            }).then(( result ) => {
                resolve( result );
            }).catch(( error ) => {
                console.error( error );
            });
        });
    },

    remove({ commit }, $data ){
        return new Promise(( resolve, reject ) => {
            this.$axios.delete( `/post/${ $data.postId }/remove`, {
                withCredentials : true
            }).then(( $result ) => {
                console.log( $result );
                resolve( $result );
            }).catch(( error ) => {
                console.error( error );
            })
        });

        console.log( $data.postId );
    }
}

