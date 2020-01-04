<template>
    <div class="manage">
        <Header />
        <UserVisual />

        <div class="config">
            <div class="config-bx">
                <h2>설정</h2>
                <div class="config-menu">
                    <ul>
                        <li v-for="( item, index ) in links" :key="index" :class="{ active : item.isActive }">
                            <router-link @click.native="menuClick( index )" :to="item.link">
                                {{ item.menu }}
                            </router-link>
                        </li>
                    </ul>
                </div>

                <div class="config-content">
                    <nuxt />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import Header from '@/components/header';
    import Global from '@/plugins/global';
    import UserVisual from "@/components/common/uservisual";

    Vue.use( Global );

    export default {
        components: {
            Header,
            UserVisual,
        },

        data() {
            return {
                links : [
                    {
                        menu : "기본 정보",
                        link : "/manage/info",
                        isActive : true,
                    },
                    {
                        menu : "게시글 수정",
                        link : "/manage/posts",
                        isActive : false,
                    },
                    {
                        menu : "나의 가이드",
                        link : "/manage/guiding",
                        isActive : false,
                    },
                    {
                        menu : "내가 가이드",
                        link : "/manage/guider",
                        isActive : false,
                    },
                ]
            }
        },

        methods : {
            menuClick( $index ){
                this.links.forEach( v => {
                    v.isActive = false;
                });

                this.links[ $index ].isActive = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .manage{ padding-bottom: 70px;
        .config{
            .config-bx{ width: 1242px; margin: 0 auto; overflow: hidden;
                h2{ font-size: 21px; text-align: center; font-weight: bold; margin-bottom: 50px; }

                .config-menu{ float: left; width: 200px; margin-right: 20px;
                    ul{ overflow: hidden; border-top: 1px solid #e0e5ee;
                        li{ text-align: center;
                            a{ display: inline-block; width: 100%; padding: 10px 0; border: 1px solid #e0e5ee; font-size: 13px; border-top: none;
                            }

                            &.active{
                                a{ background-color: #e0e5ee; }
                            }
                        }
                    }
                }

                .config-content{
                    width: 972px; float: left;
                }
            }
        }
    }

</style>