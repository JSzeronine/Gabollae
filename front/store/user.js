export const state = () => ({
    me : null,
    posts : [
        {
            title : "강원도 여행",
            content : "오늘 강원도 강릉을 갔다왔어요~! 너무 재밌는 하루였습니다. 또 가고 또 가고 싶네요. 재밌는 하루였습니다.",
            hashtags : [
                { value : "#강릉", link : "" },
                { value : "#강릉", link : "" },
                { value : "#강릉", link : "" },
                { value : "#강릉", link : "" },
            ],

            image : "/images/common/list_sample.jpg",
            map : "/images/common/map_sample.jpg"
        },
        {
            title : "강원도 여행",
            content : "오늘 강원도 강릉을 갔다왔어요~! 너무 재밌는 하루였습니다. 또 가고 또 가고 싶네요. 재밌는 하루였습니다.",
            hashtags : [
                { value : "#강릉", link : "" },
                { value : "#강릉", link : "" },
                { value : "#강릉", link : "" },
                { value : "#강릉", link : "" },
            ],

            image : "/images/common/list_sample.jpg",
            map : "/images/common/map_sample.jpg"
        },
        {
            title : "강원도 여행",
            content : "오늘 강원도 강릉을 갔다왔어요~! 너무 재밌는 하루였습니다. 또 가고 또 가고 싶네요. 재밌는 하루였습니다.",
            hashtags : [
                { value : "#강릉", link : "" },
                { value : "#강릉", link : "" },
                { value : "#강릉", link : "" },
                { value : "#강릉", link : "" },
            ],

            image : "/images/common/list_sample.jpg",
            map : "/images/common/map_sample.jpg"
        },
        {
            title : "강원도 여행",
            content : "오늘 강원도 강릉을 갔다왔어요~! 너무 재밌는 하루였습니다. 또 가고 또 가고 싶네요. 재밌는 하루였습니다.",
            hashtags : [
                { value : "#강릉", link : "" },
                { value : "#강릉", link : "" },
                { value : "#강릉", link : "" },
                { value : "#강릉", link : "" },
            ],

            image : "/images/common/list_sample.jpg",
            map : "/images/common/map_sample.jpg"
        },
    ]
});

export const mutations = {
    login( state, $data ){
        state.me = $data;
    },

    signup( state ){

    },

    loadUser( state, $data ){
        state.me = $data;
    },

    infoChange( state, $data ){
        state.me = $data;
    },

    uploadPhoto( state, $data ){
        state.me = $data;
    },

    photoChange( state, $data ){
        state.me.photo = $data;
    }
}

export const actions = {
    signup({ commit }, $data ){
        return new Promise(( resolve, reject ) => {
            this.$axios.post( "/user", {
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
                console.error( error );
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
                console.log( "로그인 성공? : ", $result );
                commit( "login", $result.data );
                resolve();
            }).catch(( error ) => {
                console.error( error );
            });
        });
    },

    async loadUser({ commit }){
        try{
            const result = await this.$axios.get( "/user", { withCredentials : true });
            commit( "loadUser", result.data );
        }catch( error ){

            console.log( "유저 없음" );
            console.log( this );
            console.error( error );
        }
    },

    infoChange({ commit }, $data ){
        this.$axios.post( "/user/infochange", {
            id : $data.id,
            intro : $data.intro
        }, { 
            withCredentials : true 
        }).then(( $result ) => {
            console.log( "변경 완료!", $result.data );
            commit( "infoChange", $result.data );
        });
    },

    photoChange({ commit }, $data ){
        commit( "photoChange", $data );
    },

    uploadPhoto({ commit }, $data ){
        this.$axios.post( "user/uploadPhoto", $data, {
            withCredentials : true
        }).then(( $result ) => {
            console.log( "업로드 완료", $result.data );
            commit( "uploadPhoto", $result.data );
        }).catch(( error ) => {

        })
    },
}