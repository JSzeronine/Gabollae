<template>
    <div class="user-bx">
        <div class="user-visual">
            <!-- <div class="visual-bg" :style="{ backgroundImage : 'url( /images/common/list_sample.jpg )' }"></div> -->
            <ProfileSmall :me="other" />
        </div>

        <div class="user-btns">
            <ul>
                <li>
                    <router-link class="btn" to="">홈</router-link>
                    <router-link class="btn" to="">여행지</router-link>
                    <router-link class="btn" to="">나의 가이드</router-link>
                    <router-link v-if="me.id == other.id" to="/manage/info/" class="btn">설정</router-link>
                </li>
            </ul>
        </div>

        <div class="user-info">
            <div v-if="other.intro" v-html="other.intro.replace(/(\n|\r\n)/g, '<br>')"></div>
        </div>

        <div class="travel-list-bx">
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

        <!-- <div class="following-list-bx">
            <ul>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
            </ul>
        </div> -->
    </div>
</template>

<script>
import Following from "@/components/common/following";
import ProfileSmall from "@/components/common/profile_small";
import TravelList from "@/components/common/travel_list";

import { mapState } from "vuex";

export default {
    components : {
        ProfileSmall,
        Following,
        TravelList,
    },

    fetch({ store, params }){
        return store.dispatch( "user/loadOther", {
            userId : params.id
        });
    },

    computed : {
        other(){
            return this.$store.state.user.other;
        },

        me(){
            return this.$store.state.user.me;
        }
    },

    mounted(){
        console.log( this.me.id, this.other.id );
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
    }
</style>