<template>
    <div class="user-bx">
        <Header/>

        <div class="user-visual">
            <div class="visual-bg" :style="{ backgroundImage : 'url( /images/common/list_sample.jpg )' }"></div>
            <ProfileSmall :other="other" />
        </div>

        <div class="user-btns">
            <ul>
                <li v-for="( item, index ) in links" :key="index">
                    <router-link @click.native="menuClick( index )" :class="{ btn_active : item.isActive }" class="btn" to="">
                        {{ item.menu }}
                    </router-link>
                </li>

                <li v-if="me && other && me.id == other.id">
                    <router-link to="/manage/info/" class="btn">설정</router-link>
                </li>
            </ul>
        </div>

        <nuxt />
    </div>
</template>

<script>
import Header from "@/components/header";
import ProfileSmall from "@/components/common/profile_small";

export default {
    components : {
        Header,
        ProfileSmall
    },

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
                    menu : "퍼온 여행지",
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

    fetch({ store, params }){
        console.log( "Fetch" );
        return store.dispatch( "user/loadOther", {
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
    },

    async mounted(){
        await this.$store.dispatch( "user/loadOther", {
            userId : this.$route.params.id
        });
    },

    methods : {
        menuClick( $index ){

        }
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