<template>
    <div class="main">
        <Visual />
        <div class="main-content">
            <Search />
            <TravelList />
        </div>

        <div>
            <button style="width:200px; height:200px;" @click="onImageUpload">버튼</button>
            <input ref="imageInput" type="file" multiple hidden @change="onChangeImages">
            <img ref="imageContainer" :src="imgURL" alt="">
        </div>

        <div class="map-container">
            <Gmap />
        </div>

        <div>
            <img ref="imgmap" src="@/assets/images/maps/IMG_0100.JPG" alt="">
        </div>

    </div>
</template>

<script>
import Visual from '@/components/main/visual';
import Search from '@/components/common/search';
import TravelList from '@/components/common/travel_list';
import EXIF from "exif-js";
import Gmap from '@/components/common/gmap';

export default {
    components : {
        Visual,
        Search,
        TravelList,
        Gmap
    },

    data() {
        return {
            hello : "Hello Index.vue",
            imgURL : ""
        }
    },

    mounted(){
        let imgTag = this.$refs.imgmap;
        let data = {};
        EXIF.getData( imgTag, function(){
            data = EXIF.getAllTags( this );
            console.log( this, data );
        })
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
            let imgTag = this.$refs.imageContainer;

            console.log( input.files );

            if( input.files && input.files[ 0 ] ){
                let reader = new FileReader();
                reader.onload = function( $event ){
                    vm.imgURL = $event.target.result;

                    EXIF.getData( imgTag, function(){
                        let data = EXIF.getAllTags( this );
                        console.log( this, data );
                    });

                    // this.$refs.imageContainer.onload = function(){
                    //     console.log( "imgload complete" );
                    // }

                    // image.src = $event.target.result;
                }

                reader.readAsDataURL( input.files[ 0 ] );
            }
        },
    }
}

</script>

<style lang="scss" scoped>

</style>