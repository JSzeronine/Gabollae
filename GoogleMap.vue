<template>
    <div class="map-container">
        GoogleMap
        <GmapMap
            :center="mapPosition"
            :zoom="16"
            style="width:100%; height:100%"
        >
            <!-- <gmap-info-window :position="{lat:37, lng:128}">
                차 막혀!!
            </gmap-info-window> -->
            <gmap-marker :position="mapPosition">
            </gmap-marker>
        </GmapMap>

        <button @click="onImageUpload">버튼</button>
        <input ref="imageInput" type="file" multiple hidden @change="onChangeImages">

        <img class="imgsample" ref="imageContainer2" src="@/assets/map.jpg" alt="">
        <img class="imgsample" ref="imageContainer" :src="imgURL" alt="">

    </div>
</template>

<script>
import EXIF from "exif-js";
import Find from '@/plugins/find';

export default {
    components : {
    },

    data(){
        return{
            imgURL : "",
            mapPosition : {
                lat : 0,
                lng : 0
            }
        }
    },

    mounted(){
        let vm = this;
        window.onload = function(){
            EXIF.getData( vm.$refs.imageContainer2, function(){
                let data = EXIF.getAllTags( this );
                console.log( data.thumbnail.Compression );

                var latDegree = data.GPSLatitude[0].numerator;
                var latMinute = data.GPSLatitude[1].numerator;
                var latSecond = data.GPSLatitude[2].numerator * 0.01;
                var latDirection = data.GPSLatitudeRef;

                let lat = Find.ConvertDMSToDD( latDegree, latMinute, latSecond, latDirection );

                var lonDegree = data.GPSLongitude[0].numerator;
                var lonMinute = data.GPSLongitude[1].numerator;
                var lonSecond = data.GPSLongitude[2].numerator * 0.01;
                var lonDirection = data.GPSLongitudeRef;

                let lng = Find.ConvertDMSToDD( lonDegree, lonMinute, lonSecond, lonDirection );

                vm.mapPosition.lat = lat;
                vm.mapPosition.lng = lng;
            });
        }
    },

    methods : {
        onImageUpload( $e ){
            this.$refs.imageInput.click();
        },

        onChangeImages( $e ){
            let input = $e.target;
            let vm = this;

            // document.getElementById('file-input').onchange = function (e) {
            //     loadImage(
            //         e.target.files[0],
            //         function (img) {
            //             document.body.appendChild(img);
            //         },

            //         { maxWidth: 600, orientation:true }
            //     );
            // };

            let fileReader = new FileReader();

            if( input.files && input.files[ 0 ] ){

                console.log( input.files );

                Find.getMapPosition( input, ( $data ) => {
                    vm.mapPosition = $data;
                });

                fileReader.onload = function( $e ){
                    console.log( $e.target.result );
                    vm.imgURL = $e.target.result;
                }

                fileReader.readAsDataURL( input.files[ 0 ] );

                // loadImage( input.files[ 0 ], function( img ){
                //     console.log( img );
                // }, { orientation : true });
            }
        },
    }
}
</script>

<style lang="scss" scoped>
    .map-container{
        width: 100%;
        height: 400px;
    }

    .imgsample{
        width : 300px;
    }
</style>