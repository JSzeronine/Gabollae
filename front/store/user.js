
export const state = () => ({
    me : {
        photo : "/images/common/profile.png",
        nickname : "제로나인",
        intro : `화실 ORKIS
        성인취미미술, 초보
        
        유럽미술부터 현대미술까지 1:1지도
        
        상담 : 010.2071.7207
        카톡 : studioorkis
        판매 : @orkisstudio
        작가 : @ianorkis
        수원시 영통구 이의동1352 에듀하임103-216
        blog.naver.com/studioorkis`,
    },
    // me : null,
    posts : [
        {
            title : "강원도 여행",
            description : "오늘 강원도 강릉을 갔다왔어요~! 너무 재밌는 하루였습니다. 또 가고 또 가고 싶네요. 재밌는 하루였습니다.",
            url : "",
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
            description : "오늘 강원도 강릉을 갔다왔어요~! 너무 재밌는 하루였습니다. 또 가고 또 가고 싶네요. 재밌는 하루였습니다.",
            url : "",
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
            description : "오늘 강원도 강릉을 갔다왔어요~! 너무 재밌는 하루였습니다. 또 가고 또 가고 싶네요. 재밌는 하루였습니다.",
            url : "",
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
            description : "오늘 강원도 강릉을 갔다왔어요~! 너무 재밌는 하루였습니다. 또 가고 또 가고 싶네요. 재밌는 하루였습니다.",
            url : "",
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
    signup( state ){

    },

    setInfo( state, $data ){
        state.me = $data;
    }
}

export const actions = {
    signup({ commit }, $data ){
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
        }).catch(( error ) => {
            console.error( error );
        });
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
                resolve( true );
            }).catch(( error ) => {
                console.error( error );
            });
        });
    },

    async info({ commit }){
        try{
            const result = await this.$axios.get( "user/info" );
            commit( "setInfo", result.data );
        }catch( error ){
            console.log( "유저 없음" );
            console.error( error );
        }
    },

    infoChange({ commit }, $data ){
        
    }
}