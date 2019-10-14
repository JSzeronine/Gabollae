
module.exports = {
    plugins : [
        { src : "~/plugins/swiper.js", ssr : false }
    ],

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