import Find from "@/plugins/find";

export default {
    components : {
        
    },

    data(){
        return{
            title : "",
            content : "",
            hashTag : "",
            emoticons : [
                'default.png',
                '1_01.gif',
                '1_02.gif',
                '1_03.gif',
                '1_04.gif',
                '1_05.gif',
                '1_36.gif',
                '1_37.gif',
                '1_38.gif',
                '1_39.gif',
                '1_40.gif',
                '1_46.gif',
                '1_47.gif',
                '1_48.gif',
                '1_49.gif',

                '1_50.gif',
                '1_51.gif',
                '1_52.gif',
                '1_53.gif',
                '1_54.gif',
                '1_55.gif',
                '1_56.gif',
                '1_57.gif',
                '1_58.gif',
                '1_59.gif',

                '1_60.gif',
                '1_61.gif',
                '1_62.gif',
                '1_63.gif',
                '1_64.gif',
                '1_65.gif',
                '1_66.gif',
                '1_67.gif',
                '1_68.gif',
                '1_69.gif',

                '1_70.gif',
                '1_71.gif',
                '1_72.gif',
                '1_73.gif',
                '1_74.gif',
                '1_75.gif',
                '1_76.gif',
                '1_77.gif',
                '1_78.gif',
                '1_79.gif',

                '1_80.gif',
                '1_81.gif',
                '1_82.gif',
                '1_83.gif',
                '1_84.gif',
                '1_85.gif',
                '1_86.gif',
                '1_87.gif',
                '1_88.gif',
                '1_89.gif',

                '1_90.gif',
                '1_91.gif',
                '1_92.gif',
                '1_93.gif',
                '1_94.gif',
                '1_95.gif',
                '1_96.gif',
                '1_97.gif',
                '1_98.gif',
                '1_99.gif',
                '1_100.gif',
            ],

            postwriteSwiperOption : {
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
            images : [],

            markersPosition : [],
            map : null,
            markersList : [],
            isMapLoad : false,
            slideIndex : 0,
            infoWindow : null,
        }
    },

    computed : {
        me(){
            if( !this.$store.state.user.me ){
                return this.goLink.LOGIN();
            }

            return { ...this.$store.state.user.me }
        },

        swiper(){
            return this.$refs.uploadImgSwiper.swiper;
        }
    },

    mounted(){
        console.log( this.me );
        let vm = this;
        window.onload = async () => {
            
        }

        this.$refs.mapRef.$mapPromise.then(( $map ) => {
            vm.map = $map;
            vm.infoWindow = new google.maps.InfoWindow({
                pixelOffset : new google.maps.Size( 0, -20 ),
            });

            vm.isMapLoad = true;
        });
    },

    beforeDestroy(){

    },

    methods : {
        viewChange( $index ){
            let data = this.images[ $index ];
            let marker = this.markersList[ $index ];

            data.view = !data.view;

            if( data.view ){
                marker.setVisible( true );
                this.showInfoWindow( $index );
            }else{
                marker.setVisible( false );
                this.infoWindow.close();
            }
        },

        prevMove( $index ){
            let prevIndex = $index - 1;
            if( prevIndex < 0 ) return;

            this.moveImage( prevIndex, $index );
        },

        nextMove( $index ){
            let nextIndex = $index + 1;
            if( nextIndex == this.images.length ) return;

            this.moveImage( nextIndex, $index );
        },

        moveImage( $newIndex, $oldIndex ){
            let image = this.images.splice( $oldIndex, 1 );
            this.images.splice( $newIndex, 0, image[ 0 ] );

            let marker = this.markersList.splice( $oldIndex, 1 );
            this.markersList.splice( $newIndex, 0, marker[ 0 ] );

            this.markerClick( $newIndex );
        },

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

            let imageData = this.images[ $index ];

            if( !imageData ) return;

            if( !imageData.view || !imageData.marker ){
                this.infoWindow.close();
                this.markersList.forEach(( $item ) => {
                    $item.setOpacity( 0.3 );
                });

                return;
            }

            this.map.panTo({
                lat : imageData.lat,
                lng : imageData.lng
            });

            this.markersList.forEach(( $item, $i ) => {
                
                if( $index == $i ){
                    $item.setZIndex( 101 );
                    $item.setOpacity( 1 );
                    $item.setAnimation( google.maps.Animation.BOUNCE );
                    $item.visible = true;
                }else{
                    $item.setZIndex( 100 );
                    $item.setOpacity( 0.2 );
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

        async onChangeImages( $e ){
            let input = $e.target;
            let vm = this;

            if( input.files && input.files[ 0 ] ){
                let list = Array.prototype.slice.call( input.files );

                let i = 0;
                let len = list.length;
                let file;
                let img;
                let imgFormData = new FormData();
                let ws = [];
                let pos;
                let positions = [];
                let blob;

                for( i; i<len; i++ )
                {
                    file = list[ i ];
                    pos = await Find.getMapPosition( file );
                    positions.push( pos );

                    img = await Find.getLoadImage( file );
                    ws.push( img.width );

                    let imgData = await img.toDataURL( 'image/jpeg', 1 );

                    blob = await Find.dataURItoBlob( imgData );
                    await imgFormData.append( "image", blob );
                }

                let imgURL = await this.$store.dispatch( "post/uploadImages", imgFormData );

                imgURL.data.forEach(( $src, $index ) => {
                    vm.images.push({
                        src : $src,
                        w : ws[ $index ],
                        emoticon : "1_03.gif",
                        lat : positions[ $index ].lat,
                        lng : positions[ $index ].lng,
                        message : null,
                        view : ( positions[ $index ].lat || positions[ $index ].lng ) ? true : false,
                        marker : ( positions[ $index ].lat || positions[ $index ].lng ) ? true : false,
                    });
                });

                vm.postwriteSwiper.update();
                vm.dragMapComplete();
                // vm.onComplete();
            }
        },

        dragMapComplete(){
            let vm = this;
            let len = this.images.length;
            let marker;
            let isInit = false;
            let index = 0;
            let imageData;

            for( let i = 0; i<len; i++ )
            {
                if( this.markersList[ i ] ) continue;
                if( !isInit ) index = i;

                imageData = this.images[ i ];

                marker = new google.maps.Marker({
                    position : new google.maps.LatLng( imageData.lat, imageData.lng ),
                    map : vm.map,
                    icon : `/images/emoticons/${ imageData.emoticon }`
                });

                this.markersList.push( marker );
                marker.addListener( "click", function( $e ){
                    vm.markerClick( i );
                });

                isInit = true;
            }

            this.markerClick( index );
        },

        showInfoWindow( $index ){
            if( !this.images[ $index ].view ){
                this.infoWindow.close();
                return;
            }

            let marker = this.markersList[ $index ];
            let message = this.images[ $index ].message;

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
            let index = this.postwriteSwiper.activeIndex;
            this.markerClick( index );
        },

        swiperSlideClick( $index ){
            this.markerClick( $index );
        },

        emoticonClick( $index ){
            let emoticon = this.emoticons[ $index ];

            this.images[ this.slideIndex ].emoticon = emoticon;
            this.markersList[ this.slideIndex ].setIcon( "/images/emoticons/" + emoticon );
        },

        postComplete(){
            let vm = this;

            let title = this.title;
            let content = this.content;
            let hashTag = this.hashTag;
            let images = this.images;

            if( images.length == 0 ){
                alert( "이미지를 등록해주세요." );
                return;
            }

            if( title == "" ){
                alert( "제목을 입력해주세요." );
                return;
            }

            if( content == "" ){
                alert( "내용을 입력해주세요." );
                return;
            }

            this.$store.dispatch( "post/write", { title, images, content, hashTag })
                .then(( $result ) => {
                    vm.goLink.POST( $result.data.postId );
                })
                .catch(( error ) => {
                    console.error( error );
                });
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
            let len = this.images.length;
            let list = [];

            for( i; i<len; i++ )
            {
                // calculateAndDisplayRoute( service, display, this.markers[ i ], this.markers[ i + 1 ]);
                // calculateAndDisplayRoute( this.markers[ i ], this.markers[ i + 1 ]);
                // calculateAndDisplayRoute({ "lat" : this.images[ i ].lat, "lng" : this.images[ i ].lng }, { "lat" : this.images[ i + 1 ].lat, "lng" : this.images[ i + 1 ].lng });

                list.push({
                    lat : this.images[ i ].lat,
                    lng : this.images[ i ].lng
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
    }
}