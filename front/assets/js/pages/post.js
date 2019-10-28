import Find from "@/plugins/find";
import loadImage from "blueimp-load-image";

export default {
    components : {

    },

    data(){
        return{
            testImage : "@/assets/images/icon/1_01.gif",
            title : "",
            description : "",
            message : "",
            emoticons : [
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
                require( '@/assets/images/icon/emoji_1.gif' ),
                require( '@/assets/images/icon/emoji_8.gif' ),
            ],

            postSwiperOption : {
                slidesPerView: "auto",
                spaceBetween: 10,
                centeredSlides : true,
                pagination : {
                    el : ".swiper-pagination"
                }
            },

            mapCenter : { lat : 37.555184, lng : 126.970780 },
            images : [
                // { 
                //     src : require( "@/assets/images/maps3/IMG_0134.JPG" ), 
                //     w:450,
                //     message : ""
                // },
            ],

            markersPosition : [],
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
                console.log( "구글 맵 로드 완료!" );

                vm.infoWindow = new google.maps.InfoWindow({
                    pixelOffset : new google.maps.Size( 0, -20 )
                });

                vm.map = map;
                vm.isMapLoad = true;
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
            if( this.markersPosition[ $index ] === undefined ) return;

            this.map.panTo( this.markersPosition[ $index ]);

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
                    vm.markersPosition = vm.markersPosition.concat( $position );
                    vm.mapCenter = $position[ 0 ];

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
                            maxWidth : 690,
                            maxHeight : 690,
                            orientation : true 
                        });
                    });
                });
            }
        },

        dragMapComplete(){
            let vm = this;
            let len = this.markersPosition.length;
            let position;
            let marker;
            for( let i = 0; i<len; i++ )
            {
                position = this.markersPosition[ i ];
                marker = new google.maps.Marker({
                    position : new google.maps.LatLng( position.lat, position.lng ),
                    map : vm.map,
                    // label : "" + i
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
            let len = this.markersPosition.length - 1;

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
            let emoticon = this.emoticons[ $index ];
            this.images[ this.slideIndex ].emoticon = emoticon;
            this.markersList[ this.slideIndex ].setIcon( emoticon );
        }
    }
}