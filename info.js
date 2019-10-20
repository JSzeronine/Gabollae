


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













// ==================================================================
// npm install vue2-google-maps
// npm install exif-js

// [ plugins/google-map.js ]
// import Vue from 'vue'
// import * as VueGoogleMaps from 'vue2-google-maps'
 
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyDTBk9ygjxvVMy-a99bauzRV_bXGY3sFzI',
//     v: 'GOOGLE_MAPS_VERSION',
//     libraries: 'places',
//   },
// });

/* <GmapMap
:center="{lat:10, lng:10}"
:zoom="12"
map-type-id="terrain"
style="width:50%; height:100%"
>
<gmap-info-window :position="{lat:10, lng:10}">
    차 막혀!!
</gmap-info-window>
<!-- <gmap-marker :position="{lat:10, lng:10}">
</gmap-marker> -->
</GmapMap> */
// ==================================================================


// ==================================================================
// import EXIF from "exif-js";
/* <button @click="onImageUpload">버튼</button>
<input ref="imageInput" type="file" multiple hidden @change="onChangeImages">

<img ref="imageContainer" :src="imgURL" alt=""> */

// methods : {
//     onImageUpload( $e ){
//         this.$refs.imageInput.click();
//     },

//     // function readInputFile(input) {
//     //     if(input.files && input.files[0]) {
//     //         var reader = new FileReader();
//     //         reader.onload = function (e) {
//     //             $('#preview').html("<img src="+ e.target.result +">");
//     //         }
//     //         reader.readAsDataURL(input.files[0]);
//     //     }
//     // }

//     onChangeImages( $e ){
//         let vm = this;

//         let input = $e.target;
//         if( input.files && input.files[ 0 ] ){
//             let reader = new FileReader();
//             reader.onload = function( $event ){
//                 vm.imgURL = $event.target.result;

//                 // this.$refs.imageContainer.onload = function(){

//                 // }
//             }

//             reader.readAsDataURL( input.files[ 0 ] );
//         }
// ==================================================================

// ==================================================================
// module.exports = {
//     build : {
//         vendor : [
//             "gsap",
//             "vue2-google-maps",
//             "exif-js"
//         ]
//     },

//     plugins : [
//         { 
//             src : "~/plugins/swiper", 
//             ssr : false 
//         },
//         {
//             src : "~/plugins/google-maps",
//             ssr : false
//         },
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
//     ],

//     transpile: [/^vue2-google-maps($|\/)/]
// }
// ==================================================================