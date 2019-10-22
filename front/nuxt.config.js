
module.exports = {
    build : {
        vendor : [
            "gsap",
            "vue2-google-maps",
            "exif-js"
        ]
    },

    plugins : [
        { src : "~/plugins/swiper.js", ssr : false },
        { src : "~/plugins/google-maps", ssr : false }
    ],

    transpile: [/^vue2-google-maps($|\/)/],

    modules : [
        '@nuxtjs/style-resources'
    ],

    styleResources : {
        scss : [
            '@/assets/scss/_fonts.scss',
            '@/assets/scss/_function.scss',
        ],
    },

    css : [
        "@/assets/scss/reset.scss",
        "@/assets/scss/layout.scss",
        "swiper/dist/css/swiper.css"
    ],

    head: {
        title: '가볼래',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'keywords', content: 'keyword 1, keyword 2'},
            { hid: 'description', name: 'description', content: 'This is the generic description.'}
        ],
    },
}