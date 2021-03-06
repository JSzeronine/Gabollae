import { mapState } from 'vuex';

import Comment from "@/components/post/comment.vue";
import PostList from "@/components/post/postlist";
import Profile from "@/components/common/profile.vue";

export default {
    components : {
        Comment,
        Profile,
        PostList
    },

    data(){
        return{
            postSwiperOption : {
                effect: 'coverflow',
                slidesPerView: "auto",
                spaceBetween: 10,
                centeredSlides : true,
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 50,
                    modifier: 1,
                    slideShadows : true,
                  },
                pagination : {
                    el : ".swiper-pagination",
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
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

    async fetch({ store, params }){
        await store.dispatch( "post/loadPost", {
            postId : params.id
        });

        await store.dispatch( "post/loadAllUserPost" );

        return await store.dispatch( "post/loadComment", {
            postId : params.id
        });
    },

    computed : {
        swiper(){
            return this.$refs.uploadImgSwiper.swiper;
        },

        me(){
            return this.$store.state.user.me;
        },

        other(){
            return this.$store.state.post.content.User;
        },

        list(){
            return this.$store.state.post.list;
        },

        post(){
            return this.$store.state.post.content;
        },

        liked(){
            return this.me && ( this.post.Likers || []).find( v => v.id === this.me.id );
        },

        shared(){
            return this.me && ( this.post.Shares || [] ).find( v => v.id === this.me.id );
        },

        likeText(){
            let txt = "좋아요";
            if( this.liked ) txt = "좋아요 취소";

            return txt;
        },

        getTotalLikes(){
            return this.post.Likers.length || 0;
        },

        share(){
            let txt = "퍼가기";
            if( this.shared ) txt = "퍼가기 취소";
            return txt;
        },

        getTotalShare(){
            return this.post.Shares.length || 0;
        },
    },

    mounted(){
        let vm = this;
        window.onload = async () => {
            
        }

        this.$refs.mapRef.$mapPromise.then(( $map ) => {
            vm.map = $map;
            vm.infoWindow = new google.maps.InfoWindow({
                pixelOffset : new google.maps.Size( 0, -20 ),
            });

            vm.isMapLoad = true;
            vm.dragMapComplete();
            vm.onComplete();
        });
    },

    methods : {
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
            let len = this.post.Images.length;
            let list = [];

            for( i; i<len; i++ )
            {
                // calculateAndDisplayRoute( service, display, this.markers[ i ], this.markers[ i + 1 ]);
                // calculateAndDisplayRoute( this.markers[ i ], this.markers[ i + 1 ]);
                // calculateAndDisplayRoute({ "lat" : this.post.Images[ i ].lat, "lng" : this.post.Images[ i ].lng }, { "lat" : this.post.Images[ i + 1 ].lat, "lng" : this.post.Images[ i + 1 ].lng });

                list.push({
                    lat : this.post.Images[ i ].lat,
                    lng : this.post.Images[ i ].lng
                });
            }

            const flightPath = new google.maps.Polyline({
                path: list,
                geodesic: true,
                strokeColor: "#000000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });

            flightPath.setMap( vm.map );
        },

        clickShare(){
            if( !this.me ){
                alert( "로그인 해주세요." );
                return;
            }

            if( this.shared ){
                this.$store.dispatch( "post/unshare", {
                    postId : this.post.id
                });
            }else{
                this.$store.dispatch( "post/share", {
                    postId : this.post.id
                });
            }
        },

        clickLike(){
            if( !this.me ){
                alert( "로그인 해주세요." );
                return;
            }

            if( this.liked ){
                this.$store.dispatch( "post/unlike", {
                    postId : this.post.id
               });
            }else{
                this.$store.dispatch( "post/like", {
                    postId : this.post.id
               });
            }
        },

        messageChange( $index ){
            this.showInfoWindow( $index );
        },

        markerClick( $index ){
            this.slideIndex = $index;
            this.swiper.slideTo( $index );

            var imageData = this.post.Images[ $index ];

            if( !imageData.view || !imageData.marker ){
                this.infoWindow.close();
                this.markersList.forEach(( $item ) => {
                    $item.setOpacity( 0.5 );
                });

                return;
            }

            if( imageData.view ){
                this.map.panTo({ lat : imageData.lat, lng : imageData.lng });

                this.markersList.forEach(( $item, $i ) => {
                    if( $item ){
                        if( $index == $i ){
                            $item.setZIndex( 101 );
                            $item.setOpacity( 1 );
                            $item.setAnimation( null );
                            $item.setAnimation( google.maps.Animation.BOUNCE );
                        }else{
                            $item.setZIndex( 100 );
                            $item.setOpacity( 0.5 );
                            if( $item.getAnimation() !== null ) $item.setAnimation( null );
                        }
                    }
                });
    
                this.showInfoWindow( $index );
            }
        },

        dragMapComplete(){
            let vm = this;
            let len = vm.post.Images.length;
            let marker = null;
            let emoticon;
            let imageData;
            for( let i = 0; i<len; i++ )
            {
                imageData = this.post.Images[ i ];

                marker = new google.maps.Marker({
                    position : new google.maps.LatLng( imageData.lat, imageData.lng ),
                    map : vm.map,
                });

                if( !imageData.view || !imageData.marker ){
                    marker.setVisible( false );
                }

                emoticon = imageData.emoticon;

                if( emoticon ){
                    marker.setIcon( '/images/emoticons/' + imageData.emoticon );
                }

                marker.addListener( "click", function( $e ){
                    vm.markerClick( i );
                });

                this.markersList.push( marker );
            }

            //     let bounds0 = new google.maps.LatLngBounds( new google.maps.LatLng( this.images[ $index ].position.lat, this.images[ $index ].position.lng ) );
            //     bounds0.extend( new google.maps.LatLng( this.images[ $index - 1 ].position.lat, this.images[ $index - 1 ].position.lng ) )
            //     this.map.fitBounds( bounds0 );
            //     this.map.panToBounds( bounds0 );

            vm.markerClick( 0 );
        },

        showInfoWindow( $index ){
            let marker = this.markersList[ $index ];
            let message = this.post.Images[ $index ].message;

            if( message ){
                let messageTag = '<pre class="info-window-style">';
                message = message.replace("<", "&lt;");
                messageTag += message.replace(/(?:\r\n|\r|\n)/g, '\n');
                messageTag += '</pre>';

                this.infoWindow.setContent( messageTag );
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