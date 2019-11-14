const axios = require( "axios" );

module.exports = {
    mode: 'universal', // 렌더링 모드 선택 : 'universal' | 'spa'
    build : {
        vendor : [
            "gsap",
            "vue2-google-maps",
            "exif-js"
        ],

        transpile: [/^vue2-google-maps($|\/)/],
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
        browserBaseURL : "http://localhost:3085",
        baseURL : "http://localhost:3085",
        https : false,
    },
    
    server : {
        port : 3080,
    }
}