<template>
    <div class="main">
        <Visual />
        <div class="main-content">
            <Search />
            <TravelList />
        </div>

        <div class="map-container">
            <GmapMap
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
            </GmapMap>
        </div>

        <div>
            <button @click="onImageUpload">버튼</button>
            <input ref="imageInput" type="file" multiple hidden @change="onChangeImages">
            <img ref="imageContainer" :src="imgURL" alt="">
        </div>
    </div>
</template>

<script>
import Visual from '@/components/main/visual';
import Search from '@/components/common/search';
import TravelList from '@/components/common/travel_list';
import EXIF from "exif-js";

export default {
    components : {
        Visual,
        Search,
        TravelList
    },

    data() {
        return {
            hello : "Hello Index.vue",
            imgURL : ""
        }
    },

    methods : {
        onImageUpload( $e ){
            this.$refs.imageInput.click();
        },

        // function readInputFile(input) {
        //     if(input.files && input.files[0]) {
        //         var reader = new FileReader();
        //         reader.onload = function (e) {
        //             $('#preview').html("<img src="+ e.target.result +">");
        //         }
        //         reader.readAsDataURL(input.files[0]);
        //     }
        // }

        onChangeImages( $e ){
            let vm = this;
            let input = $e.target;

            if( input.files && input.files[ 0 ] ){
                let reader = new FileReader();
                reader.onload = function( $event ){
                    vm.imgURL = $event.target.result;
                    // this.$refs.imageContainer.onload = function(){
                        
                    // }
                }

                reader.readAsDataURL( input.files[ 0 ] );
            }
        },
    }
}

</script>

<style lang="scss" scoped>
    .map-container{
        width: 100%;
        height: 300px;
    }
</style>