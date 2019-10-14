

// npm i vue nuxt

// npm i -D node-sass sass-loader @nuxtjs/style-resources
// module.exports = {
//     modules : [
//         '@nuxtjs/style-resources'
//     ],

//     styleResources : {
//         scss : [
//             '@/assets/scss/_function.scss'
//         ],
//     }
// }



// npm install vue-awesome-swiper --save

// module.exports = {
//     plugins : [
//         { src : "~/plugins/swiper.js", ssr : false }
//     ],

//     modules : [
//         "@nuxtjs/style-resources",
//     ],

//     styleResources : {
//         scss : [
//             "~/assets/scss/_function.scss"
//         ],
//     },

//     css : [
//         "swiper/dist/css/swiper.css"
//     ]
// }

// default.vue
// import Vue from 'vue';

// if (process.browser) {
//     const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
//     Vue.use(VueAwesomeSwiper)
// }





// Headers.vue
/* <template>
    <div class="header">
        <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="( item, index ) in items" :key="index">
                    <router-link :to="item">
                        {{ item }}
                    </router-link>
                </div>
            </div>

            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            items : [ "/", "/profile", "/signup", ],
            swiperOption : {
                pagination : {
                    el : ".swiper-pagination"
                }
            }
        }
    }
}
</script> */

// export default class Find{
//     constructor(){

//     }

//     static get( $parent, $className ){
//         return $parent.querySelectorAll( $className );
//     }
// }