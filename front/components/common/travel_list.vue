<template>
    <div class="travel-list-item" @mouseenter="mOver" @mouseleave="mOut">
        <div class="img-bx">
            <router-link @click.native="postClick" to="">
                <div class="photo_travel" :style="{ backgroundImage:`url( ${ getResourceURL }${ info.src })` }"></div>
                <div class="photo_map" style="background-image:url( /images/common/map_sample.jpg );"></div>
            </router-link>
        </div>

        <div class="travel-list-content">
            <dl>
                <dt class="text-nowrap1">
                    {{ info.title }}
                </dt>
                <dd class="description text-nowrap2">
                    {{ info.content }}
                </dd>
            </dl>

            <div class="info-bx">
                <router-link class="user" :to="`/user/${ user.id }`">
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
                    this.$router.push( `/revision/${ this.info.id }` );
                break;
                
                default : 
                    this.$router.push( `/post/${ this.info.id }` );
            }
        },

        mOver( $e ){
            let item = $e.target;
            let map = Find.get( item, ".photo_map" );

            TweenMax.to( map, 0.3, { y:-200, ease:Cubic.easeInOut });
        },

        mOut( $e ){
            let item = $e.target;
            let map = Find.get( item, ".photo_map" );

            TweenMax.to( map, 0.3, { y:0, ease:Cubic.easeInOut });
        }
    }
}
</script>

<style lang="scss" scoped>
    .travel-list-item{ margin-bottom: 5px; width: 100%; display: block;
        .img-bx{ width: 100%; height: 200px; overflow: hidden;
            a{
                > div{ width: 100%; height: 100%; background-repeat: no-repeat; background-size: cover; background-position: center;
                
                }
            }
        }

        .travel-list-content{ border: 1px solid #ccc; border-top: none; padding: 10px;
            dl{ margin-bottom: 5px;
                dt{ font-size: 18px; margin-bottom: 5px; color: black; }
                dd{ font-size: 13px; line-height: 20px; color: #666; height: 36px; }
            }

            .info-bx{
                .user{ font-size: 13px; color: black; }
                span{ font-size: 13px; color: black; }
                .gabollae{ font-size: 13px; color: black;
                    span{ font-size: 12px; color: red; }
                }
            }
        }
    }
</style>