import { mapState } from 'vuex';

import Comment from "@/components/post/comment.vue";
import Profile from "@/components/common/profile.vue";

export default {
    components : {
        Comment,
        Profile
    },

    data(){
        return{
            postSwiperOption : {
                slidesPerView: "auto",
                spaceBetween: 10,
                centeredSlides : true,
                pagination : {
                    el : ".swiper-pagination"
                }
            },

            mapCenter : { lat : 37.555184, lng : 126.970780 },
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
        },

        ...mapState( "post", [ 
            "title", 
            "description", 
            "images", 
            "hashtags" ]),
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

                vm.dragMapComplete();
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

            if( this.images[ $index ].position === undefined ) return;

            // if( $index - 1 >= 0 ){
            //     let bounds0 = new google.maps.LatLngBounds( new google.maps.LatLng( this.images[ $index ].position.lat, this.images[ $index ].position.lng ) );
            //     bounds0.extend( new google.maps.LatLng( this.images[ $index - 1 ].position.lat, this.images[ $index - 1 ].position.lng ) )
            //     this.map.fitBounds( bounds0 );
            //     this.map.panToBounds( bounds0 );
            // }else{
                this.map.panTo( this.images[ $index ].position );
            // }   

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

        dragMapComplete(){
            let vm = this;
            let len = this.images.length;
            let position;
            let marker;
            for( let i = 0; i<len; i++ )
            {
                position = this.images[ i ].position;

                marker = new google.maps.Marker({
                    position : new google.maps.LatLng( position.lat, position.lng ),
                    map : vm.map,
                    icon : this.images[ i ].emoticon
                });

                this.markersList.push( marker );
                marker.addListener( "click", function( $e ){
                    vm.markerClick( i );
                });
            }

            vm.markerClick( 0 );
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

        onSlide(){
            let index = this.postSwiper.activeIndex;
            this.markerClick( index );
        },

        swiperSlideClick( $index ){
            this.markerClick( $index );
        },
    }
}