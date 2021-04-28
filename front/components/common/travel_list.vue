<template>
    <div class="travel-list-item" @mouseenter="travelOver" @mouseleave="travelOut">
        <div class="user-photo" @mouseenter="photoOver" @mouseleave="photoOut">
            <router-link :to="`/users/${ user.id }/home`">
                <span v-if="user.photo" class="photo" :style="{ backgroundImage : `url( ${ getResourceURL }${ user.photo })` }"></span>
                <span v-else class="photo" :style="{ backgroundImage : `url( /images/common/default.jpg )` }"></span>
            </router-link>
        </div>

        <div class="img-bx">
            <router-link class="travel-photo" @click.native="postClick" to="">
                <div class="photo_travel" :style="{ backgroundImage:`url( ${ getResourceURL }${ info.src })` }"></div>
                <div class="photo_map" style="background-image:url( /images/common/map_sample.jpg );"></div>
            </router-link>
        </div>

        <div class="travel-list-content">
            <dl>
                <dt class="text-nowrap1">
                    <router-link @click.native="postClick" to="">{{ info.title }}</router-link>
                </dt>
                <dd class="description text-nowrap1">
                    <router-link @click.native="postClick" to="">{{ info.content }}</router-link>
                </dd>
            </dl>

            <div class="info-bx">
                <router-link class="user" :to="`/users/${ user.id }/home`">
                    {{ user.nickname }}
                </router-link>
                <span>|</span>
                <span class="gabollae">
                    좋아요
                    <span>{{ getTotalLike }}</span>
                </span>
            </div>

            <div>
                <span>{{ $moment( info.createdAt ).fromNow() }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Find from "@/plugins/find.js";
import TweenMax from "gsap";

export default {
    props : {
        info : Object,
        user : Object,
        mode : String,
    },

    data(){
        return{
            REVISION : "revision"
        }
    },

    computed : {
        getTotalLike(){
            return this.info.Likers.length || 0;
        }
    },

    mounted(){

    },

    methods : {
        postClick(){
            switch( this.mode ){
                case this.REVISION : 
                    this.goLink.REVISION( this.info.id );
                break;
                
                default :
                    this.goLink.POST( this.info.id );
            }
        },

        mOver( $e ){
            // let item = $e.target;
            // let map = Find.get( item, ".photo_map" );

            // TweenMax.to( map, 0.3, { y:-200, ease:Cubic.easeInOut });
        },

        mOut( $e ){
            // let item = $e.target;
            // let map = Find.get( item, ".photo_map" );

            // TweenMax.to( map, 0.3, { y:0, ease:Cubic.easeInOut });
        },

        photoOver( $e ){
            let photo = Find.get( $e.target, ".photo" );
            TweenMax.to( photo, 0.5, { scale:1.1, ease:Expo.easeOut });
        },

        photoOut( $e ){
            let photo = Find.get( $e.target, ".photo" );
            TweenMax.to( photo, 0.5, { scale:1, ease:Expo.easeOut });
        },

        travelOver( $e ){
            let photo = Find.get( $e.target, ".photo_travel" );
            TweenMax.to( photo, 0.5, { scale:1.1, ease:Expo.easeOut });

            TweenMax.to( $e.target, 0.5, { boxShadow : "2px 2px 10px gray", top:-3, ease:Expo.easeOut });
        },

        travelOut( $e ){
            let photo = Find.get( $e.target, ".photo_travel" );
            TweenMax.to( photo, 0.5, { scale:1, ease:Expo.easeOut });

            TweenMax.to( $e.target, 0.5, { boxShadow : "0px 0px 0px gray", top:0, ease:Expo.easeOut });
        }
    }
}
</script>

<style lang="scss" scoped>
    .travel-list-item{ margin-bottom: 5px; width: 100%; display: block; overflow: hidden; border-radius: 3px; position: relative;
        .user-photo{ position: absolute; left: 5px; top: 5px; width: 50px; height:50px; z-index: 100; border-radius: 100%; overflow: hidden;
            border: 1px solid #d3d3d3;
            a{
                span{ display:block; width: 100%; height: 100%; background-repeat: no-repeat; background-size: cover; background-position: center; }
            }
        }

        .img-bx{ width: 100%; height: 200px; overflow: hidden;
            a{
                > div{ width: 100%; height: 100%; background-repeat: no-repeat; background-size: cover; background-position: center;
                    
                }
            }
        }

        .travel-list-content{ border: 1px solid #ccc; padding: 10px;
            a{ color: black; }
            dl{ margin-bottom: 5px; 
                dt{ font-size: 16px; margin-bottom: 3px; color: black; }
                dd{ font-size: 12px; line-height: 20px; color: black; height: 20px; }
            }

            .info-bx{
                .user{ font-size: 13px; color: black; 
                    &:hover{ text-decoration: underline; }
                }

                span{ font-size: 13px; color: black; }
                .gabollae{ font-size: 13px; color: black;
                    span{ font-size: 12px; color: red; }
                }
            }
        }
    }
</style>