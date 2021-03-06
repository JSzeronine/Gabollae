import Find from "@/plugins/find";
export default {
    components : {
        
    },

    data(){
        return{
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
            map : null,
            markersList : [],
            isMapLoad : false,
            slideIndex : 0,
            infoWindow : null,
        }
    },

    async fetch({ store, params}){
        return await store.dispatch( "post/loadPost", {
            postId : params.id
        });
    },

    created(){

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
    },

    mounted(){
        let vm = this;
        this.$refs.mapRef.$mapPromise.then(( $map ) => {
            vm.map = $map;
            vm.infoWindow = new google.maps.InfoWindow({
                pixelOffset : new google.maps.Size( 0, -20 ),
            });

            vm.isMapLoad = true;
            vm.dragMapComplete();
            vm.showHashtags();
        });
    },

    methods : {
        viewChange( $index ){
            let data = this.post.Images[ $index ];
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
            if( nextIndex == this.post.Images.length ) return;

            this.moveImage( nextIndex, $index );
        },

        moveImage( $newIndex, $oldIndex ){
            let image = this.post.Images.splice( $oldIndex, 1 );
            this.post.Images.splice( $newIndex, 0, image[ 0 ] );

            let marker = this.markersList.splice( $oldIndex, 1 );
            this.markersList.splice( $newIndex, 0, marker[ 0 ] );

            this.markerClick( $newIndex );
        },

        showHashtags(){
            this.post.Hashtags.forEach(( v ) => {
                this.hashTag += `#${ v.content } `;
            });
        },

        removeClick( $index ){
            this.post.Images.splice( $index, 1 );

            this.markersList[ $index ].setMap( null );
            this.markersList.splice( $index, 1 );
        },

        messageChange( $index ){
            this.showInfoWindow( $index );
        },

        markerClick( $index ){
            this.slideIndex = $index;
            this.swiper.slideTo( $index );

            let imageData = this.post.Images[ $index ];

            if( !imageData ) return;

            if( !imageData.view ){
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
                    $item.setAnimation( null );
                    $item.setAnimation( google.maps.Animation.BOUNCE );
                    $item.setOpacity( 1 );
                }else{
                    $item.setZIndex( 100 );
                    if( $item.getAnimation() !== null ) $item.setAnimation( null );
                    $item.setOpacity( 0.3 );
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

                for( i; i<len; i++ )
                {
                    file = list[ i ];
                    pos = await Find.getMapPosition( file );

                    img = await Find.getLoadImage( file );
                    ws.push( img.width );

                    positions.push( pos );

                    let imgData = await img.toDataURL( 'image/jpeg', 1 );
                    imgFormData.append( "image", await Find.dataURItoBlob( imgData ));
                }

                let imgURL = await this.$store.dispatch( "post/uploadImages", imgFormData );

                imgURL.data.forEach(( $src, $index ) => {
                    vm.post.Images.push({
                        src : $src,
                        w : ws[ $index ],
                        emoticon : "default.png",
                        lat : positions[ $index ].lat,
                        lng : positions[ $index ].lng,
                        message : null,
                        view : ( positions[ $index ].lat ) ? true : false,
                        marker : ( positions[ $index ].lat ) ? true : false,
                    });
                });

                vm.postwriteSwiper.update();
                vm.dragMapComplete();
            }
        },

        dragMapComplete(){
            let vm = this;
            let len = this.post.Images.length;
            let marker;
            let isInit = false;
            let index = 0;
            let imageData;

            for( let i = 0; i<len; i++ )
            {
                if( this.markersList[ i ] ) continue;
                if( !isInit ) index = i;

                imageData = this.post.Images[ i ];

                marker = new google.maps.Marker({
                    position : new google.maps.LatLng( imageData.lat, imageData.lng ),
                    map : vm.map,
                    icon : `/images/emoticons/${ imageData.emoticon }`
                });

                if( !imageData.view || !imageData.marker ) marker.setVisible( false );

                this.markersList.push( marker );
                marker.addListener( "click", function( $e ){
                    vm.markerClick( i );
                });

                isInit = true;
            }

            this.markerClick( index );
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
            let index = this.postwriteSwiper.activeIndex;
            this.markerClick( index );
        },

        emoticonClick( $index ){
            let emoticon = this.emoticons[ $index ];
            let sIndex = this.slideIndex;

            this.post.Images[ sIndex ].emoticon = emoticon;
            this.markersList[ sIndex ].setIcon( `/images/emoticons/${ this.post.Images[ sIndex ].emoticon }` );
        },

        async revisionClick(){
            this.post.Hashtags = this.hashTag;

            if( this.post.Images.length == 0 ){
                alert( "이미지를 등록해주세요." );
                return;
            }

            if( this.post.title == "" ){
                alert( "제목을 입력해주세요." );
                return;
            }

            if( this.post.content == "" ){
                alert( "내용을 입력해주세요." );
                return;
            }

            try{
                let result = await this.$store.dispatch( "post/revision", {
                    data : this.post
                });

                alert( result.data );
                this.goLink.POST( this.post.id );
            }catch( error ){
                console.error( error );
            }
        },

        removePostClick(){
            this.$store.dispatch( "post/remove", {
                postId : this.post.id
            }).then(( $result ) => {
                alert( $result.data );
                this.goLink.HOME();
            }).catch(( error ) => {
                console.error( error );
            })
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