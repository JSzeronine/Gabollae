export const state = () => ({
    me : null,
    other : null,
    Guidings : [],
    Guiders : []
});

export const mutations = {
    login( state, $data ){
        state.me = $data;
    },

    signup( state ){

    },

    logout( state, $data ){
        state.me = $data;
    },

    loadUser( state, $data ){
        state.me = $data;
    },

    infoChange( state, $data ){
        state.me = $data;
    },

    uploadPhoto( state, $data ){
        state.me.photo = $data;
    },

    photoChange( state, $data ){
        state.me.photo = $data;
    },

    loadOther( state, $data ){
        state.other = $data;
    },

    guide( state, $data ){
        state.me.Guiding.push({
            id : $data
        });
    },

    unguide( state, $data ){
        const index = state.me.Guiding.findIndex( v => v.id === $data );
        state.me.Guiding.splice( index, 1 );
    },

    unguider( state, $data ){
        const index = state.me.Guider.findIndex( v => v.id === $data );
        state.me.Guider.splice( index, 1 );
    },

    setGuidings( state, $data ){
        state.Guidings = $data;
    },

    setGuiders( state, $data ){
        state.Guiders = $data;
    },

    removeGuiders( state, $data ){
        const index = state.Guiders.findIndex( v => v.id === $data );
        state.Guiders.splice( index, 1 );
    }
}

export const actions = {
    signup({ commit }, $data ){
        return new Promise(( resolve, reject ) => {
            this.$axios.post( "/user/signup", {
                email : $data.email,
                password : $data.password,
                nickname : $data.nickname,
                birth : $data.birth,
                username : $data.userName,
                checked : $data.checked,
            }, {
                withCredentials : true
            }).then(( $result ) => {
                console.log( $result );
                resolve();
            }).catch(( error ) => {
                console.error( error.message );
            });
        })
    },

    login({ commit }, $data ){
        return new Promise(( resolve, reject ) => {
            this.$axios.post( "/user/login", {
                email : $data.email,
                password : $data.password,
                checked : $data.checked,
            }, {
                withCredentials : true
            }).then(( $result ) => {
                commit( "login", $result.data );
                resolve();
            }).catch(( error ) => {
                console.error( error );
                reject();
            });
        });
    },

    logout({ commit }, $data ){
        return new Promise(( resolve, reject ) => {
            this.$axios.post( "/user/logout", {}, { withCredentials : true }).then(( $result ) => {
                commit( "logout", null );
                resolve();
            })
        });
    },

    async loadUser({ commit }){
        try{
            const result = await this.$axios.get( "/user", { withCredentials : true });
            commit( "loadUser", result.data );
        }catch( error ){
            console.log( "유저 없음" );
            console.error( error );
        }
    },

    loadOther({ commit }, $data ){
        return this.$axios.get( `/user/${ $data.userId }`).then(( $result ) => {
            commit( "loadOther", $result.data );
        });
    },

    infoChange({ commit }, $data ){
        return new Promise(( resolve, reject ) => {
            this.$axios.post( "/user/infochange", {
                id : $data.id,
                intro : $data.intro
            }, { 
                withCredentials : true 
            }).then(( $result ) => {
                commit( "infoChange", $result.data );
                resolve();

            }).catch(( error ) => {
                console.error( error );
                reject();
            })
        });
    },

    photoChange({ commit }, $data ){
        commit( "photoChange", $data );
    },

    uploadPhoto({ commit }, $data ){
        return new Promise(( resolve, reject ) => {
            this.$axios.post( "/user/uploadPhoto", $data, {
                withCredentials : true
            }).then(( $result ) => {
                resolve( $result.data.photo );
            }).catch(( error ) => {
                reject();
                console.error( error );
            });
        })
    },

    async guide({ commit }, $data ){

        try{
            const userId = await this.$axios.post( `/user/${ $data.userId }/guide`, {

            }, {
                withCredentials : true
            });

            commit( "guide", userId.data );
    
        }catch( error ){
            console.error( error );
        }
    },

    async unguide({ commit }, $data ){

        try{
            const userId = await this.$axios.delete( `/user/${ $data.userId }/unguide`, {
                withCredentials : true
            });

            commit( "unguide", userId.data );

        }catch( error ){
            console.error( error );
        }
    },

    async unguider({ commit }, $data ){

        try{
            const otherId = await this.$axios.delete( `/user/${ $data.otherId }/unguider`, {
                withCredentials : true
            });

            const data = otherId.data;

            commit( "unguider", data );
            // commit( "removeGuiders", data );

        }catch( error ){
            console.error( error );
        }
    },

    async loadGuiding({ commit }, $data ){
        try{
            const guidings = await this.$axios.get( `/user/${ $data.userId }/guidings`, {
                withCredentials : true
            });

            commit( "setGuidings", guidings.data );
        }
        catch( error ){
            console.error( error );
        }
    },

    async loadGuider({ commit }, $data ){
        try{
            const guiders = await this.$axios.get( `/user/${ $data.userId }/guiders`, {
                withCredentials : true
            });

            commit( "setGuiders", guiders.data );
        }catch( error ){
            console.error( error );
        }
    }
}