
module.exports = {
    build : {
        vendor : [
            "gsap",
            "vue2-google-maps",
            "exif-js"
        ],
        
        transpile: [/^vue2-google-maps($|\/)/],
        analyze : false,
        extend( config, { isClient, isServer }){
            if( isServer && config.mode === "production" ){
                config.devtool = "hidden-source-map";
            }
        }
    },

    buildModules : [
        "@nuxtjs/moment"
    ],

    moment : {
        locales : [ "ko" ]
    },

    plugins : [
        { src : "~/plugins/swiper.js", ssr : false },
        { src : "~/plugins/google-maps", ssr : false },
    ],

    modules : [
        '@nuxtjs/style-resources',
        '@nuxtjs/axios'
    ],

    css : [
        { src : "@/assets/scss/layout.scss", lang : 'scss' },
        { src : "@/assets/scss/common.scss", lang : 'scss' },
        { src : "swiper/dist/css/swiper.css" },
        { src : "@/assets/scss/reset.scss", lang : 'scss' },
    ],

    styleResources : {
        scss : [
            '@/assets/scss/_fonts.scss',
            '@/assets/scss/_function.scss',
        ],
    },

    head: {
        title: 'TEST',
        meta: [
            { charset: 'utf-8' },
            // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'viewport', content: 'width=1280' },
            { name: 'keywords', content: 'keyword 1, keyword 2'},
            { hid: 'description', name: 'description', content: 'This is the generic description.'}
        ],
    },

    axios : {
        // browserBaseURL : "http://10.105.157.58:3085",
        // baseURL : "http://10.105.157.58:3085",
        browserBaseURL : process.env.NODE_ENV === "production" ? "https://3.133.211.47" : "http://localhost:3085",
        baseURL : process.env.NODE_ENV === "production" ? "https://3.133.211.47" : "http://localhost:3085",
        https : false,
    },
    
    server : {
        // host : '10.105.157.58',
        port : process.env.PORT || 3080,
    }
}