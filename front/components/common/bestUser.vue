<template>
    <div class="best-user">
        <div class="best-user-bx">
            <div class="best-user-title">
                <h2>BEST USER</h2>
            </div>

            <ul class="best-user-list">
                <li v-for="( item, index ) in list" @mouseenter="mOver" @mouseleave="mOut" :key="index">
                    <router-link to="">
                        <div class="best-user-bx">
                            <div class="intro">
                                <p class="text-nowrap2">가나다라마바사아자차카타파하가나다라마바사아자차카타파하가나다라마바사아자차카타파하</p>
                            </div>
                            <div class="user-photo" :style="{ backgroundImage : `url( images/common/profile.png )`}"></div>
                        </div>

                        <div class="best-user-name">
                            <p>zeronine</p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Find from "@/plugins/find.js";
export default {
    data(){
        return{
            list : [
                1, 2, 3, 4, 5, 6
            ]
        }
    },

    methods : {
        mOver( $e ){
            const item = $e.target;
            var photo = Find.get( item, ".user-photo" );
            TweenMax.to( photo, 0.35, { opacity:0.5, ease:Expo.easeOut });

            let intro = Find.get( $e.target, ".intro" );
            TweenMax.set( intro, { scale:1.5, opacity:0 });
            TweenMax.to( intro, 0.35, { scale:1, opacity:1, ease:Expo.easeOut });
        },

        mOut( $e ){
            const item = $e.target;
            var photo = Find.get( item, ".user-photo" );
            TweenMax.to( photo, 0.35, { opacity:1, ease:Expo.easeOut });

            let intro = Find.get( $e.target, ".intro" );
            TweenMax.to( intro, 0.35, { scale:1.5, opacity:0, ease:Expo.easeOut });
        }
    }
}
</script>

<style lang="scss" scoped>
    .best-user{ background-color: #f3f3f3; padding: 70px 0;
        .best-user-bx{ width: 972px; margin: 0 auto;
            .best-user-title{ margin-bottom: 30px;
                h2{
                    font-size: 22px; color: #222; text-align: center;
                }
            }

            .best-user-list{ overflow: hidden; margin-left: -38px;
                li{ float: left; margin-left: 38px; 
                    .best-user-bx{ width: 130px; height: 130px; 
                        background-color: #000; border-radius: 100%; overflow: hidden; margin-bottom: 10px; border: 5px solid #fff; position: relative;

                        .intro{ font-size: 14px; color: #fff; display: table-cell; vertical-align: middle; width: 130px; height: 130px; 
                            text-shadow: 2px 2px 2px #000; position: relative; z-index: 100; opacity: 0;
                            p{ padding: 0 15px; }
                        }

                        .user-photo{ position: absolute; left : 0px; top: 0px; z-index: 10; width: 100%; height: 100%;
                            background-size: cover; background-position: center; background-repeat: no-repeat; 
                        }
                    }

                    .best-user-name{ text-align: center; font-size: 16px; }
                }
            }
        }
    }
</style>