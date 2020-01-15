export const state = () => ({
    content : null,
    list : [],
    all : [],
    hitPost : [],
    hitAllPost : [],
    newPost : [],
    hashtag : null,
    comments : [],
    allHashtags : [],
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

    loadHitPost( state, $data ){
        state.hitPost = $data;
    },

    loadNewPost( state, $data ){
        state.newPost = $data;
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

    addShare( state, $data ){
        state.content.Shares.push({
            id : $data.userId
        });
    },

    removeShare( state, $data ){
        var index = state.content.Shares.findIndex( v => v.id === $data );
        state.content.Shares.splice( index, 1 );
    },

    allHashTags( state, $data ){
        state.allHashtags = $data;
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

    async hashtag({ commit }, $data ){
        const posts = await this.$axios.get( `/post/hashtag/${ $data.hashtag }`);
        commit( "loadHashtagPost", posts.data );
    },

    async allHashtag({ commit }, $data ){
        const allHashtags = await this.$axios.get( `/post/allhashtag`, { withCredentials : true });
        commit( "allHashTags", allHashtags.data );
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

    async hitPost({ commit }){
        const hitPost = await this.$axios.get( `/post/hit`, { withCredentials : true });
        commit( "loadHitPost", hitPost.data );
    },

    async hitAll({ commit }){
        const hitAllPost = await this.$axios.get( `/post/allhit`, { withCredentials : true });
        commit( "loadAllPost", hitAllPost.data );
    },

    async newPost({ commit }){
        const newPost = await this.$axios.get( `/post/new`, { withCredentials : true });
        commit( "loadNewPost", newPost.data );
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

    async share({ commit }, $data ){
        const share = await this.$axios.post( `/post/${ $data.postId }/share`, {

        }, {
            withCredentials : true,
        });

        commit( "addShare", share.data );
    },

    async unshare({ commit }, $data ){
        const share = await this.$axios.delete( `/post/${ $data.postId }/share`, {
            withCredentials : true   
        });

        commit( "removeShare", share.data );
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

