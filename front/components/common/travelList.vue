<template>
    <div v-if="user" class="travel-list-bx">
        <div class="travel-list-content">
            <div class="list-title">
                <h2>{{ title }}</h2>
                <div class="btn_more">
                    <router-link to="">더보기</router-link>
                </div>
            </div>

            <div v-if="user.Posts.length !== 0" class="list-bx">
                <ul>
                    <li v-for="( item, index ) in user.Posts" :key="index">
                        <div class="travel-list-item" @mouseenter="mOver" @mouseleave="mOut">
                            <div class="img-bx">
                                <router-link @click.native="postClick( item.id )" to="">
                                    <div class="photo_travel" :style="{ backgroundImage:`url( ${ getResourceURL }${ item.src })` }"></div>
                                    <div class="photo_map" style="background-image:url( /images/common/map_sample.jpg );"></div>
                                </router-link>
                            </div>

                            <div class="travel-list-content">
                                <dl>
                                    <dt class="text-nowrap1">{{ item.title }}</dt>
                                    <dd class="description text-nowrap1">{{ item.content }}</dd>
                                </dl>

                                <div class="info-bx">
                                    <router-link class="user" :to="`/users/${ user.id }/home`">{{ user.nickname }}</router-link>
                                    <span>|</span>
                                    <span class="gabollae">
                                        좋아요 <span>{{ item.Likers.length || 0 }}</span>
                                    </span>
                                </div>

                                <div>
                                    <span>{{ $moment( item.createdAt ).fromNow() }}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div v-else>여행지가 없습니다.</div>
        </div>
    </div>
</template>

<script>
import Find from "@/plugins/find";
import TweenMax from "gsap";
export default {
    props : {
        title : "",
        user : Object,
        mode : String
    },

    data(){
        return{
            REVISION : "revision"
        }
    },

    computed : {

    },

    mounted(){
        console.log( this.user.Posts );
    },

    methods : {
        postClick( $postId ){
            switch( this.mode ){
                case this.REVISION : 
                    this.goLink.REVISION( $postId );
                break;
                
                default : 
                    this.goLink.POST( $postId );
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
    .travel-list-item{ margin-bottom: 5px; width: 100%; display: block; overflow: hidden; border-radius: 3px;
        .img-bx{ width: 100%; height: 200px; overflow: hidden;
            a{
                > div{ width: 100%; height: 100%; background-repeat: no-repeat; background-size: cover; background-position: center;
                    
                }
            }
        }

        .travel-list-content{ border: 1px solid #ccc; padding: 10px;
            dl{ margin-bottom: 5px; 
                dt{ font-size: 16px; margin-bottom: 3px; color: black; }
                dd{ font-size: 12px; line-height: 20px; color: #666; height: 20px; }
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