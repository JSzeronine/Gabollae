<template>
    <div class="post">
        <div class="post-bx">
            <div class="post-img-map-content">
                <div class="img-content">
                    <div class="img-container">
                        <div ref="uploadImgSwiper" v-swiper:postSwiper="postSwiperOption" @slideChange="onSlide">
                            <div ref="imgContainer" class="swiper-wrapper">
                                <!-- <div class="swiper-slide" v-for="( image, index ) in images" :key="index" :style="{ color:'#fff', fontSize : 18, width:image.w + 'px', backgroundImage : 'url(' + image.src + ')' }"> -->
                                <div class="swiper-slide" @click="swiperSlideClick( index )" v-for="( image, index ) in images" :key="index" :style="{ width:image.w + 'px' }">
                                    <img :src="image.src" alt="">
                                </div>

                                <div class="swiper-slide" :style="{ width:'300px' }">
                                    <div class="upload-bx">
                                        <div class="upload-title">
                                            이미지를 <br />
                                            추가해 주세요.
                                        </div>

                                        <div class="btn-upload-bx">
                                            <a class="btn-upload" href="javascript:;" @click="onImageUpload">+</a>
                                            <input ref="imageInput" type="file" multiple hidden @change="onChangeImages">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                </div>

                <div class="map-content">
                    <div class="map-container">
                        <GmapMap ref="mapRef" :center="mapPosition" :zoom="17" style="width:100%; height:500px">
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
            </div>

            <div class="post-content">
                <div class="post-title">
                    <input type="text" placeholder="제목을 입력해주세요.">
                </div>

                <div class="post-description">
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                </div>
            </div>

            <!-- <div class="img-list-bx">
                <img ref="imgmap" src="@/assets/images/maps/IMG_0100.JPG" alt="">
            </div> -->
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
            icon : [
                require( '@/assets/images/icon/1_01.gif' ),
                require( '@/assets/images/icon/1_02.gif' ),
                require( '@/assets/images/icon/1_03.gif' ),
                require( '@/assets/images/icon/1_04.gif' ),
                require( '@/assets/images/icon/1_05.gif' ),
                require( '@/assets/images/icon/1_06.gif' ),
                require( '@/assets/images/icon/1_07.gif' ),
                require( '@/assets/images/icon/1_08.gif' ),
                require( '@/assets/images/icon/1_46.gif' ),
                require( '@/assets/images/icon/1_47.gif' ),
                require( '@/assets/images/icon/1_48.gif' ),
                require( '@/assets/images/icon/1_49.gif' ),
                require( '@/assets/images/icon/1_50.gif' ),
            ],

            postSwiperOption : {
                slidesPerView: "auto",
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

            images : [
                // { src : require( "@/assets/images/maps3/IMG_0134.JPG" ), w:450 },
            ],

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
                // EXIF.getData( imgTag, function(){
                //     let data = EXIF.getAllTags( this );

                //     console.log( data );

                //     var latDegree = data.GPSLatitude[0].numerator;
                //     var latMinute = data.GPSLatitude[1].numerator;
                //     var latSecond = data.GPSLatitude[2].numerator * 0.01;
                //     var latDirection = data.GPSLatitudeRef;

                //     let lat = Find.ConvertDMSToDD( latDegree, latMinute, latSecond, latDirection );

                //     var lonDegree = data.GPSLongitude[0].numerator;
                //     var lonMinute = data.GPSLongitude[1].numerator;
                //     var lonSecond = data.GPSLongitude[2].numerator * 0.01;
                //     var lonDirection = data.GPSLongitudeRef;

                //     let lng = Find.ConvertDMSToDD( lonDegree, lonMinute, lonSecond, lonDirection );

                //     vm.mapPosition.lat = lat;
                //     vm.mapPosition.lng = lng;

                //     map.panTo({ lat, lng });
                // });

                vm.map = map;
            });
        }
    },

    methods : {
        markerClick( $index ){
            this.swiper.slideTo( $index );
            if( this.markers[ $index ] === undefined ) return;

            this.map.panTo( this.markers[ $index ]);

            this.markersList.forEach(( $item, $i ) => {
                if( $index == $i ){
                    $item.setAnimation( google.maps.Animation.BOUNCE );
                }else{
                    if( $item.getAnimation() !== null ) $item.setAnimation( null );
                }
            });

            // let marker = this.markersList[ $index ];
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
                                // vm.images.push( $tag.toDataURL() );

                                vm.images.push({
                                    src : $tag.toDataURL(),
                                    w : $tag.width
                                });

                                console.log( $tag.width );

                                vm.postSwiper.update();
                            });

                            // vm.onComplete();
                            vm.dragMapComplete();
                        }

                    }, { 
                        // maxWidth:896,
                        maxHeight : 600,
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
                    // icon : vm.icon[ i ],
                    // label : "" + i
                    // label : "가",
                    // title : "메롱"
                });

                this.markersList.push( marker );
                marker.addListener( "click", function( $e ){
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

        swiperSlideClick( $index ){
            console.log( $index );
        }
    }
}
</script>

<style lang="scss" scoped>
    .post{ padding-top: 20px; background-color: #f9f9f9;
        .post-bx{ width: 100%; max-width: 1280px; margin: 0 auto; 
            .post-img-map-content{ overflow: hidden; margin-bottom: 10px; font-size: 0;
                .img-content{ float: left; width: getPer( 780 ); margin-right: getPer( 20 ); height:500px; overflow: hidden; background-color: #fff;
                    .img-container{ width: 100%; height: 100%; 
                        .swiper-container{ height: 100%;
                            .swiper-wrapper{
                                .swiper-slide{ display: inline-block; height: 100%; background-repeat: no-repeat; background-size: contain; background-position: center;
                                    img{ width: 100%; }
                                    
                                    .upload-bx{ width: 100%; height: 100%; text-align: center; padding-top: 194px; border: 1px solid #e1e1e1;
                                        .upload-title{ text-align: center; font-size: 13px; color: #0d0d0d; margin-bottom: 10px; line-height: 18px; }

                                        .btn-upload-bx{ 
                                            .btn-upload{ display: inline-block; padding: 12px 18px; border: 1px solid #0d0d0d;
                                                font-size: 15px; color: #0d0d0d; font-weight: bold; 
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                .map-content{ width: getPer( 480 ); float: left; 
                    .map-container{ height: 500px; overflow: hidden; }
                }
            }

            .post-content{
                .post-title{ border-bottom: 1px solid #d3d3d3; padding: 10px; font-size: 16px; color: #0d0d0d; margin-bottom: 10px; 
                    input::placeholder{ color: #0d0d0d; }
                }

                .post-description{
                    textarea{
                        width: 100%; border: 1px solid #d3d3d3; padding: 10px; font-size: 13px;
                        background-color: transparent;
                    }
                }

                .img-list-bx{ width: 300px; 
                    img{ width: 100%; }
                }
            }
        }
    }


</style>