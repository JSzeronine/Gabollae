<template>
    <div class="user-bx">
        <div class="user-visual">
            <!-- <div class="visual-bg" :style="{ backgroundImage : 'url( /images/common/list_sample.jpg )' }"></div> -->
            <ProfileSmall :other="other" />
        </div>

        <div class="user-btns">
            <ul>
                <li v-for="( item, index ) in links" :key="index">
                    <router-link @click.native="menuClick( index )" :class="{ btn_active : item.isActive }" class="btn" to="">
                        {{ item.menu }}
                    </router-link>
                </li>

                <li v-if="me.id == other.id">
                    <router-link to="/manage/info/" class="btn">설정</router-link>
                </li>
            </ul>
        </div>

        <div v-if="links[ 0 ].isActive" class="user-info">
            <div v-if="other.intro" v-html="other.intro.replace(/(\n|\r\n)/g, '<br>')"></div>
        </div>

        <div v-if="links[ 1 ].isActive" class="travel-list-bx">
            <div class="travel-list-content">
                <div class="list-title">
                    <h2>최신 여행지</h2>
                </div>

                <div class="list-bx">
                    <ul>
                        <li v-for="( item, index ) in other.Posts" :key="index">
                            <TravelList :info="item" :user="other" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div v-if="links[ 2 ].isActive" class="following-list-bx">
            <ul>
                <li v-for="( item, index ) in guidings" :key="index">
                    <Guiding :other="item" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Guiding from "@/components/common/guiding";
import ProfileSmall from "@/components/common/profile_small";
import TravelList from "@/components/common/travel_list";

import { mapState } from "vuex";

export default {
    data(){
        return{
            links : [
                {
                    menu : "홈",
                    link : "",
                    isActive : true,
                },
                {
                    menu : "여행지",
                    link : "",
                    isActive : false,
                },
                {
                    menu : "가이드",
                    link : "",
                    isActive : false,
                }
            ]
        }
    },

    components : {
        ProfileSmall,
        Guiding,
        TravelList,
    },

    fetch({ store, params }){
        store.dispatch( "user/loadOther", {
            userId : params.id
        });

        return store.dispatch( "user/loadGuiding", {
            userId : params.id
        });
    },

    computed : {
        me(){
            return this.$store.state.user.me;
        },

        other(){
            return this.$store.state.user.other;
        },

        guidings(){
            return this.$store.state.user.Guidings;
        }
    },

    methods : {
        menuClick( $index ){
            this.links.forEach( v => v.isActive = false );
            this.links[ $index ].isActive = true;
        }
    },

    mounted(){

    }
}
</script>

<style lang="scss" scoped>
    .user-bx{ max-width: 1280px; width: 100%; margin: 0 auto; 
        .user-visual{ margin-bottom: 20px;
            .visual-bg{ width: 1280px; height: 240px; background-repeat: no-repeat; background-size: cover; background-position: center; 
                margin-bottom: 10px;
            }
        }

        .user-btns{
            ul{ overflow: hidden;
                li{ float: left; margin-right: 5px; }
            }
        }
    }
</style>