
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
}