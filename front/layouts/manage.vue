<template>
    <div>
        <Header />
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

    Vue.use( Global );

    export default {
        components: {
            Header,
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
    .config{
        .config-bx{ width: 100%; max-width: 1280px; margin: 0 auto; overflow: hidden;
            h2{ font-size: 21px; text-align: center; font-weight: bold; margin-bottom: 50px; }

            .config-menu{ width: 18%; float: left; margin-right: 2%;
                ul{ overflow: hidden;
                    li{ text-align: center;
                        a{ display: inline-block; width: 100%; padding: 10px 0; border: 1px solid #e0e5ee; font-size: 16px; }

                        &.active{
                            a{ background-color: #e0e5ee; }
                        }
                    }
                }
            }

            .config-content{
                width: 80%; float: left;
            }
        }
    }
</style>