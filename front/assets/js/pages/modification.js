import Find from "@/plugins/find";
import { mapState, mapActions } from "vuex";

export default {
    components : {
        
    },

    data(){
        return{
            title : "",
            description : "",
            images : [
                // { src : require( "@/assets/images/maps3/IMG_0134.JPG" ), w:450, message : "" }
            ],

            hashTag : "",
            emoticons : [
                require( '@/assets/images/icon/1_01.gif' ),
                require( '@/assets/images/icon/1_02.gif' ),
                require( '@/assets/images/icon/1_03.gif' ),
                require( '@/assets/images/icon/1_04.gif' ),
                require( '@/assets/images/icon/1_05.gif' ),
                require( '@/assets/images/icon/1_36.gif' ),
                require( '@/assets/images/icon/1_37.gif' ),
                require( '@/assets/images/icon/1_38.gif' ),
                require( '@/assets/images/icon/1_39.gif' ),
                require( '@/assets/images/icon/1_40.gif' ),
                require( '@/assets/images/icon/1_46.gif' ),
                require( '@/assets/images/icon/1_47.gif' ),
                require( '@/assets/images/icon/1_48.gif' ),
                require( '@/assets/images/icon/1_49.gif' ),
                require( '@/assets/images/icon/1_50.gif' ),
            ],

            postwriteSwiperOption : {
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

    created(){
        let vm = this;
        let post = this.$store.state.post;

        this.title = post.title;
        this.description = post.description;
        this.images = JSON.parse( JSON.stringify( this.$store.state.post.images ));

        this.$store.state.post.hashtags.forEach(( $item ) => {
            vm.hashTag += ( "#" + $item.value + " " );
        });
    },

    computed : {
        swiper(){
            return this.$refs.uploadImgSwiper.swiper;
        },

        // ...mapState( "post", [
        //     "title",
        //     "description",
        //     "hashtags",
        //     "images"
        // ]),
    },

    mounted(){
        let vm = this;
        window.onload = async () => {
            vm.map = await this.$refs.mapRef.$mapPromise;
            vm.infoWindow = new google.maps.InfoWindow({
                pixelOffset : new google.maps.Size( 0, -20 ),
            });

            vm.isMapLoad = true;
            vm.dragMapComplete();
        }
    },

    methods : {
        removeClick( $index ){
            this.images.splice( $index, 1 );

            this.markersList[ $index ].setMap( null );
            this.markersList.splice( $index, 1 );
        },

        messageChange( $index ){
            this.showInfoWindow( $index );
        },

        markerClick( $index ){
            this.slideIndex = $index;
            this.swiper.slideTo( $index );

            if( this.images[ $index ] ){
                this.map.panTo( this.images[ $index ].position );

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
            }
        },

        onImageUpload( $e ){
            if( !this.isMapLoad ){
                alert( "구글 맵이 로드중입니다." );
                return;
            }

            this.$refs.imageInput.click();
        },

        async onChangeImages( $e ){
            let input = $e.target;
            let vm = this;

            if( input.files && input.files[ 0 ] ){
                let list = Array.prototype.slice.call( input.files );

                let i = 0;
                let len = list.length;
                let file;
                let img;
                let position;
                let data;
                let initPosition;

                for( i; i<len; i++ )
                {
                    file = list[ i ];
                    img = await Find.getLoadImage( file );
                    position = await Find.getMapPosition( file )

                    if( i == 0 ){
                        vm.mapCenter = position;
                    }

                    data = {
                        src : img.toDataURL(),
                        w : img.width,
                        emoticon : null,
                        position : position,
                        message : null
                    }

                    vm.images.push( data );
                }

                vm.postwriteSwiper.update();
                vm.dragMapComplete();
            }
        },

        dragMapComplete(){
            this.initMarker();

            let vm = this;
            let len = this.images.length;
            let position;
            let marker;
            
            for( let i = 0; i<len; i++ )
            {
                position = this.images[ i ].position;
                marker = this.createMarker( position, this.images[ i ].emoticon );

                this.markersList.push( marker );
                marker.addListener( "click", function( $e ){
                    vm.markerClick( i );
                });
            }

            vm.showInfoWindow( vm.slideIndex );
        },

        createMarker( $position, $emoticon ){
            let marker = new google.maps.Marker({
                position : new google.maps.LatLng( $position.lat, $position.lng ),
                map : this.map,
                icon : $emoticon
            });

            return marker;
        },

        initMarker()
        {
            this.markersList.forEach(( $marker ) => {
                $marker.setMap( null );
            });

            this.markersList.length = 0;
        },

        showInfoWindow( $index ){
            let marker = this.markersList[ $index ];
            let message = this.images[ $index ].message;

            if( message ){

                let messageTag = '<div class="info-window-style">';
                messageTag += message.replace(/(?:\r\n|\r|\n)/g, '<br />');
                messageTag += '</div>';

                this.infoWindow.setContent( messageTag );
                this.infoWindow.open( this.map, marker );

            }else{
                this.infoWindow.close();
            }
        },

        onSlide(){
            let index = this.postwriteSwiper.activeIndex;
            this.markerClick( index );
        },

        emoticonClick( $index ){
            let emoticon = this.emoticons[ $index ];
            let sIndex = this.slideIndex;

            this.images[ sIndex ].emoticon = emoticon;
            this.markersList[ sIndex ].setIcon( this.images[ sIndex ].emoticon );
        },

        modificationClick(){
            console.log( "수정 완료" );

            console.log( "title : ", this.title );
            console.log( "description : ", this.description );
            console.log( "hashTag : ", this.hashTag );
            console.log( "images : ", this.images );

            console.log( "============================" );
            console.log( this.$store.state.post.title );
            console.log( this.$store.state.post.description );
            console.log( this.$store.state.post.hashTag );
            console.log( this.$store.state.post.images );
        },

        // 길찾기[ 그닥 쓰고 싶진 않지만..일단 갖고 있자 ]
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
    }
}