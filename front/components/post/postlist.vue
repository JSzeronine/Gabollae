<template>
    <div class="postlist-bx" @mouseenter="mOver" @mouseleave="mOut">
        <div class="bx">
            <router-link class="list-link" :to="`/post/${ info.id }`">
                <div class="thumbnail" :style="{ backgroundImage : `url( ${ getResourceURL }${ info.src })` }"></div>
            </router-link>

            <div class="info">
                <dl>
                    <dt class="title">{{ info.title }}</dt>
                    <dd class="content text-nowrap2">{{ info.content }}</dd>
                    <dd class="user">
                        <router-link :to="`/user/${ info.User.id }`">
                            {{ info.User.nickname }} 
                        </router-link> 
                        | 좋아요 <span>{{ getTotalLikes }}</span>
                    </dd>
                    <dd class="like">
                        
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
import Find from "@/plugins/find";
import TweenMax from "gsap";
export default {
    props : {
        info : Object,
    },

    data(){
        return{

        }
    },

    computed : {
        getTotalLikes(){
            return this.info.Likers.length || 0;
        }
    },

    mounted(){
        
    },

    methods : {
        mOver( $e ){
            let item = Find.get( $e.target, ".thumbnail" );
            TweenMax.to( item, 0.5, { scale:1.5, ease:Expo.easeOut });
        },

        mOut( $e ){
            let item = Find.get( $e.target, ".thumbnail" );
            TweenMax.to( item, 0.5, { scale:1, ease:Expo.easeOut });
        }
    }
}
</script>

<style lang="scss" scoped>
    .postlist-bx{
        .bx{ overflow: hidden;
            .list-link{ overflow: hidden; display: inline-block; width: 145px; height: 100px; float: left; border-radius: 7px;
                .thumbnail{ width: 100%; height: 100%; background-repeat: no-repeat; background-size: cover; background-position: center; }
            }

            .info{ width: 325px; float: left; box-sizing: border-box; padding-left: 10px;
                dl{
                    dt{ white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 18px; margin-bottom: 5px; }
                    dd{
                        white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 5px;
                        &.content{ font-size: 13px;
                            height: 40px; white-space: normal; 
                            word-wrap: break-word; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
                        }

                        &.user{ 
                            a{ font-size: 14px; color: #725898; 
                                .follow-value{ font-size: 13px; color: #0d0d0d; }
                            }
                        }

                        &.like{ margin-bottom: 0;
                            font-size: 12px;
                            span{ font-size: 12px; }
                        }
                    }
                }
            }
        }
    }
</style>