<template>
    <div class="user-bx">
        <Header/>
        <UserVisual />

        <div class="user-info">
            <div class="profile">
                <ProfileSmall :other="other" />
            </div>

            <div class="user-btns">
                <ul>
                    <li v-for="( item, index ) in links" :key="index">
                        <router-link :to="item.link" @click.native="menuClick( index )" :class="{ btn_active : item.isActive }" class="btn">
                            {{ item.menu }}
                        </router-link>
                    </li>

                    <li v-if="me && other && me.id == other.id">
                        <router-link to="/manage/info/" class="btn">설정</router-link>
                    </li>
                </ul>
            </div>            
        </div>

        <nuxt />
    </div>
</template>

<script>
import Header from "@/components/header";
import ProfileSmall from "@/components/common/profile_small";
import UserVisual from "@/components/common/uservisual";

export default {
    components : {
        Header,
        ProfileSmall,
        UserVisual
    },

    data(){
        return{
            links : [
                {
                    menu : "홈",
                    link : `home`,
                    isActive : true,
                },
                {
                    menu : "여행지",
                    link : `travel`,
                    isActive : false,
                },
                {
                    menu : "퍼온 여행지",
                    link : `travelshare`,
                    isActive : false,
                },
                {
                    menu : "가이드",
                    link : `guide`,
                    isActive : false,
                }
            ]
        }
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
            this.links.forEach( $item => $item.isActive = false );
            this.links[ $index ].isActive = true;
        }
    }
}
</script>

<style lang="scss" scoped>
    .user-bx{ width: 100%; margin: 0 auto; 
        .user-info{ width: 972px; margin: 0 auto; margin-bottom: 20px;
            .profile{ 
                margin-bottom: 20px;
            }

            .user-btns{ 
                ul{ overflow: hidden;
                    li{ float: left; margin-right: 5px; }
                }
            }
        }
    }
</style>