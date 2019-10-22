<template>
    <div class="post">
        <div class="post-content">
            <div class="map-content">
                <div class="map-container">
                    <GmapMap ref="mapRef" :center="mapPosition" :zoom="17" style="width:100%; height:300px">
                        <!-- <gmap-info-window :position="mapPosition">
                            커피 마셨어요~!
                        </gmap-info-window> -->

                        <!-- <div v-for="( marker, index ) in markers" :key="index">
                            <gmap-marker :position="marker" @click="markerClick( index )"></gmap-marker>
                        </div> -->

                        <!-- <gmap-polyline v-bind:path.sync="markers" v-bind:options="{ strokeColor:'rgba( 0, 0, 0, 1 )', strokeWidth : '0.1' }"></gmap-polyline> -->
                    </GmapMap>
                </div>

            </div>

            <div class="write-bx">
                <div class="img-container">
                    <div ref="uploadImgSwiper" v-swiper:postSwiper="postSwiperOption" @slideChange="onSlide">
                        <div ref="imgContainer" class="swiper-wrapper">
                            <div class="swiper-slide" v-for="( image, index ) in images" :key="index" :style="{ backgroundImage : 'url(' + image + ')' }">
                                <!-- <img :src="image" alt=""> -->
                                <!-- <div :style="{ 'backgroundImage' : 'url(' + image + ')' }"></div> -->
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <button style="width:200px; height:50px; font-size:20px;" @click="onImageUpload">이미지 업로드</button>
            <input ref="imageInput" type="file" multiple hidden @change="onChangeImages">
        </div>

        <div class="img-list-bx">
            <img ref="imgmap" src="@/assets/images/maps/IMG_0100.JPG" alt="">
        </div>

    </div>
</template>

<script>
import EXIF from "exif-js";
import Find from "@/plugins/find";
import loadImage from "blueimp-load-image";
export default {
    components : {

    },

    data(){
        return{
            icon : require( '@/assets/images/icon/emoji_8.gif' ),
            postSwiperOption : {
                // slidesPerView: 3,
                spaceBetween: 10,
                centeredSlides : true,
                // spaceBetween: 30,
                pagination : {
                    el : ".swiper-pagination"
                }
            },

            mapPosition : {
                lat : 0,
                lng : 0
            },

            images : [],
            markers : [],
            map : null,
            markersList : [],
        }
    },

    computed : {
        swiper(){
            return this.$refs.uploadImgSwiper.swiper;
        }
    },

    mounted(){
        let vm = this;
        window.onload = () => {
            this.$refs.mapRef.$mapPromise.then((map) => {
                let imgTag = vm.$refs.imgmap;
                EXIF.getData( imgTag, function(){
                    let data = EXIF.getAllTags( this );

                    console.log( data );

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

                    map.panTo({ lat, lng });
                    vm.map = map;
                });
            });
        }
    },

    methods : {
        markerClick( $index ){
            this.swiper.slideTo( $index );
            this.map.panTo( this.markers[ $index ]);

            this.markersList.forEach(( $item ) => {
                $item.setAnimation( null );
            })

            let marker = this.markersList[ $index ];
            marker.setAnimation( google.maps.Animation.BOUNCE );
        },

        onImageUpload( $e ){
            this.$refs.imageInput.click();
        },

        onChangeImages( $e ){
            let input = $e.target;
            let vm = this;
            let fileReader = new FileReader();

            if( input.files && input.files[ 0 ] ){

                Find.getMapPosition( input, ( $data ) => {
                    vm.markers = vm.markers.concat( $data );
                    vm.mapPosition = $data[ 0 ];
                });

                let list = Array.prototype.slice.call( input.files );
                let newList = [];
                let count = 0;
                list.forEach(( $item, $index ) => {
                    loadImage( $item, function( img ){
                        count++;
                        newList[ $index ] = img;

                        if( count >= list.length ){
                            
                            newList.forEach(( $tag ) => {
                                vm.images.push( $tag.toDataURL() );
                                vm.postSwiper.update();
                            });

                            // vm.onComplete();
                            vm.dragMapComplete();
                        }

                    }, { 
                        // maxWidth:896,
                        maxHeight : 500,
                        orientation : true 
                    });
                });
            }
        },

        dragMapComplete(){

            let vm = this;

            let len = this.markers.length;
            let position;
            let marker;

            for( let i = 0; i<len; i++ )
            {
                position = this.markers[ i ];
                marker = new google.maps.Marker({
                    position : new google.maps.LatLng( position.lat, position.lng ),
                    map : vm.map,
                    // label : "가",
                    icon : vm.icon
                });

                this.markersList.push( marker );
                marker.addListener( "click", function( $e ){
                    console.log( i );

                    vm.markerClick( i );
                });
            }
        },

        onComplete(){
            let vm = this;
            function calculateAndDisplayRoute( start, destination) {
                let service = new google.maps.DirectionsService({
                    suppressMarkers: false
                });

                let display = new google.maps.DirectionsRenderer;

                display.setMap( vm.$refs.mapRef.$mapObject );

                // BICYCLING: "BICYCLING"
                // DRIVING: "DRIVING"
                // TRANSIT: "TRANSIT"
                // TWO_WHEELER: "TWO_WHEELER"
                // WALKING: "WALKING"

                service.route({
                    origin: start,
                    destination: destination,
                    travelMode: google.maps.DirectionsTravelMode.TRANSIT,
                    transitOptions : {
                        modes : [ "BUS" ],
                        routingPreference: 'FEWER_TRANSFERS'
                    },

                    optimizeWaypoints: false,
                    provideRouteAlternatives: false,
                    avoidFerries: true,
                    avoidHighways: true,
                    avoidTolls: true,
                    }, function(response, status) {
                    if (status === 'OK') {
                        display.setDirections(response);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            }

            let i = 0;
            let len = this.markers.length - 1;

            for( i; i<len; i++ )
            {
                // calculateAndDisplayRoute( service, display, this.markers[ i ], this.markers[ i + 1 ]);
                calculateAndDisplayRoute( this.markers[ i ], this.markers[ i + 1 ]);
            }
        },

        onSlide(){
            let index = this.postSwiper.activeIndex;
            this.markerClick( index );
        },
    }
}
</script>

<style lang="scss" scoped>
    .post{ width: 100%; max-width: 1024px; margin: 0 auto;
        .post-content{ overflow: hidden; margin-bottom: 50px;
            .map-content{ border: 1px solid #999; margin-bottom: 10px;
                .map-container{ height: 300px; }
            }

            .write-bx{ height: 445px;
                .img-container{ width: 100%; height: 100%; display: inline-block;
                    .swiper-container{ height: 100%;
                        .swiper-wrapper{
                            .swiper-slide{ background-color: #000; height: 100%; background-repeat: no-repeat; background-size: contain; background-position: center;
                                // img{ width: auto; height: 100%; }
                            }
                        }
                    }
                }
            }
        }

        .img-list-bx{ width: 300px; 
            img{ width: 100%; }
        }
    }


</style>