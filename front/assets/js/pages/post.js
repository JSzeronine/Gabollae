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
            return ( this.post.Likers || []).find( v => v.id === this.me.id );
        },

        shared(){
            return ( this.post.Shares || [] ).find( v => v.id === this.me.id );
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
        });
    },

    methods : {
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
                    $item.setOpacity( 0.3 );
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
                            $item.setOpacity( 0.2 );
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