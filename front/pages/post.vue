<template>
    <div class="post">
        <div class="post-bx">
            <div class="post-img-map-content">
                <div class="img-content">
                    <div class="img-container">
                        <div ref="uploadImgSwiper" v-swiper:postSwiper="postSwiperOption" @slideChange="onSlide">
                            <div ref="imgContainer" class="swiper-wrapper">
                                <div class="swiper-slide image-view-list" @click="swiperSlideClick( index )" v-for="( image, index ) in images" :key="index" :style="{ width:image.w + 'px' }">

                                    <div v-if="image.emoticon" class="option-bx">
                                        <img :src="image.emoticon" alt="">
                                    </div>

                                    <div><img :src="image.src" alt=""></div>

                                    <div class="message-bx">
                                        <input v-on:input="messageChange( index )" v-model="image.message" type="text" placeholder="말풍선 메세지 한줄 남기기">
                                    </div>
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
                        <GmapMap class="gmap-container" ref="mapRef" :center="mapPosition" :zoom="17" style="width:100%; height:500px">
                            <!-- <gmap-polyline v-bind:path.sync="markers" v-bind:options="{ strokeColor:'rgba( 0, 0, 0, 1 )', strokeWidth : '0.1' }"></gmap-polyline> -->
                        </GmapMap>
                    </div>
                </div>
            </div>

            <div class="post-content">
                <div class="post-write-bx">
                    <div class="post-title">
                        <input type="text" v-model="title" placeholder="제목을 입력해주세요.">
                    </div>

                    <div class="post-description">
                        <textarea v-model="description" name="" id="" cols="30" rows="10">내용을 입력해주세요.</textarea>
                    </div>
                </div>

                <div class="map-option">
                    <div class="map-option-emoticon">
                        <div class="map-option__title">
                            <p>이모티콘</p>
                        </div>

                        <ul class="map-option__emoticon">
                            <li class="map-option__emoticon-list" v-for="( emoticon, index ) in icon" :key="index">
                                <a href="javascript:;" @click="emoticonClick( index )">
                                    <img :src="emoticon" alt="">
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="post-complete">
                <div>
                    <a class="btn-complete" href="javascript:;">입력 완료</a>
                </div>
            </div>
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
            title : "",
            description : "",
            message : "",
            icon : [
                require( '@/assets/images/icon/1_01.gif' ),
                require( '@/assets/images/icon/1_02.gif' ),
                require( '@/assets/images/icon/1_03.gif' ),
                require( '@/assets/images/icon/1_04.gif' ),
                require( '@/assets/images/icon/1_05.gif' ),
                require( '@/assets/images/icon/1_06.gif' ),
                require( '@/assets/images/icon/1_07.gif' ),
                require( '@/assets/images/icon/1_08.gif' ),
                require( '@/assets/images/icon/1_09.gif' ),
                require( '@/assets/images/icon/1_10.gif' ),
                require( '@/assets/images/icon/1_46.gif' ),
                require( '@/assets/images/icon/1_47.gif' ),
                require( '@/assets/images/icon/1_48.gif' ),
                require( '@/assets/images/icon/1_49.gif' ),
                require( '@/assets/images/icon/1_50.gif' ),
                require( '@/assets/images/icon/4_31.gif' ),
                require( '@/assets/images/icon/5_43.gif' ),
                require( '@/assets/images/icon/5_44.gif' ),
                require( '@/assets/images/icon/5_45.gif' ),
                require( '@/assets/images/icon/5_46.gif' ),
                require( '@/assets/images/icon/5_47.gif' ),
                require( '@/assets/images/icon/5_48.gif' ),
                require( '@/assets/images/icon/5_49.gif' ),
                require( '@/assets/images/icon/5_50.gif' ),
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
                lat : 37.555184,
                lng : 126.970780
            },

            images : [
                // { src : require( "@/assets/images/maps3/IMG_0134.JPG" ), w:450 },
            ],

            markers : [],
            map : null,
            markersList : [],
            isMapLoad : false,
            slideIndex : 0,
            infoWindow : null,
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

                vm.infoWindow = new google.maps.InfoWindow({
                    pixelOffset : new google.maps.Size( 0, -20 )
                });

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
                vm.isMapLoad = true;

                console.log( "구글 맵 로드 완료!" );
            });
        }
    },

    methods : {
        messageChange( $index ){
            this.showInfoWindow( $index );
        },

        markerClick( $index ){
            this.slideIndex = $index;

            this.swiper.slideTo( $index );
            if( this.markers[ $index ] === undefined ) return;

            this.map.panTo( this.markers[ $index ]);

            this.markersList.forEach(( $item, $i ) => {
                
                if( $index == $i ){
                    $item.setZIndex( 101 );
                    $item.setAnimation( null );
                    $item.setAnimation( google.maps.Animation.BOUNCE );
                }else{
                    $item.setZIndex( 100 );
                    if( $item.getAnimation() !== null ) $item.setAnimation( null );
                }
            });

            this.showInfoWindow( $index );
        },

        onImageUpload( $e ){
            if( !this.isMapLoad ){
                alert( "구글 맵이 로드중입니다." );
                return;
            }

            this.$refs.imageInput.click();
        },

        onChangeImages( $e ){
            let input = $e.target;
            let vm = this;

            if( input.files && input.files[ 0 ] ){
                Find.getMapPosition( input, ( $position ) => {
                    vm.markers = vm.markers.concat( $position );
                    vm.mapPosition = $position[ 0 ];

                    let list = Array.prototype.slice.call( input.files );
                    let newList = [];
                    let count = 0;
                    list.forEach(( $item, $index ) => {
                        loadImage( $item, function( img, $data ){
                            count++;
                            newList[ $index ] = img;

                            if( count >= list.length ){
                                
                                newList.forEach(( $tag ) => {
                                    vm.images.push({
                                        src : $tag.toDataURL(),
                                        w : $tag.width,
                                        emoticon : ""
                                    });

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

        showInfoWindow( $index ){
            let marker = this.markersList[ $index ];
            let message = this.images[ $index ].message;

            if( message ){
                this.infoWindow.setContent( message );
                this.infoWindow.open( this.map, marker );
            }else{
                this.infoWindow.close();
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
            this.markerClick( $index );
        },

        emoticonClick( $index ){
            let emoticon = this.icon[ $index ];
            this.images[ this.slideIndex ].emoticon = emoticon;
            this.markersList[ this.slideIndex ].setIcon( emoticon );
        }
    }
}
</script>

<style lang="scss">
    .post{ padding-top: 20px; background-color: #f9f9f9; padding-bottom: 150px;
        .post-bx{ width: 100%; max-width: 1280px; margin: 0 auto; 
            .post-img-map-content{ overflow: hidden; margin-bottom: 10px; font-size: 0;
                .img-content{ float: left; width: getPer( 780 ); margin-right: getPer( 20 ); height:500px; overflow: hidden; background-color: #fff;
                    .img-container{ width: 100%; height: 100%; 
                        .swiper-container{ height: 100%;
                            .swiper-wrapper{
                                .swiper-slide{ display: inline-block; height: 100%; background-repeat: no-repeat; background-size: contain; background-position: center;
                                    &.image-view-list{ position: relative;
                                        .option-bx{ position: absolute; right: 0; top: 0; padding-right: 10px; padding-top: 10px;
                                            img{ padding: 2px; display: inline-block; margin-right: 5px; margin-bottom: 5px; border: 1px solid #0d0d0d; background-color: #fff;

                                            }
                                        }

                                        .message-bx{ opacity: 0.8; position: absolute; width: 100%; bottom: 0px; left: 0; background-color: #fff;
                                            input{ font-size: 12px; padding: 10px; }
                                        }
                                    }

                                    img{ width: 100%; }
                                    
                                    .upload-bx{ width: 100%; height: 100%; text-align: center; padding-top: 194px; 
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
                    .map-container{ width: 100%; height: 500px;
                        .vue-map-container{ width: 100%; height: 100%; display: block;
                            .vue-map{ width: 100%; height: 100%; }
                        }
                    }
                }
            }

            .post-content{ overflow: hidden; margin-bottom: 30px;
                .post-write-bx{ width: getPer( 780 ); margin-right: getPer( 20 ); float: left;
                    .post-title{ border-bottom: 1px solid #d3d3d3; padding: 0 10px 10px; font-size: 16px; color: #0d0d0d; margin-bottom: 10px; 
                        input::placeholder{ color: #0d0d0d; }
                    }

                    .post-description{
                        textarea{
                            width: 100%; border: 1px solid #d3d3d3; padding: 10px; font-size: 13px;
                            background-color: transparent;
                        }
                    }
                }

                .map-option{ width: getPer( 480 ); float: left; padding: 5px;
                    .map-option__title{ margin-bottom: 8px;
                        p{ font-size: 16px; }
                    }

                    .map-option-emoticon{ margin-bottom: 10px;
                        .map-option__emoticon{ font-size: 0; 
                            .map-option__emoticon-list{ padding: 2px; display: inline-block; margin-right: 5px; margin-bottom: 5px; border: 1px solid #d3d3d3; }
                        }
                    }
                }

                .img-list-bx{ width: 300px; 
                    img{ width: 100%; }
                }
            }

            .post-complete{
                > div{ text-align: center;
                    .btn-complete{ display: inline-block; color: #0d0d0d; font-size: 16px; border: 1px solid #d3d3d3; padding: 10px 60px; }
                }
            }
        }
    }


</style>