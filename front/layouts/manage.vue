<template>
    <div>
        <!-- <Header /> -->
        <div class="config">
            <div class="config-bx">
                <h2>설정</h2>
                <div class="config-menu">
                    <ul>
                        <li class="active"><router-link to="/manage/info">기본 정보</router-link></li>
                        <li><router-link to="/manage/posts">글 관리</router-link></li>
                        <li><router-link to="/manage/friend">친구 관리</router-link></li>
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
    import Header from '@/components/header';
    export default {
        components: {
            Header,
        },

        data() {
            return {

            }
        },
    }
</script>

<style lang="scss" scoped>
    .config{
        .config-bx{ width: 100%; max-width: 1024px; margin: 0 auto;
            h2{ font-size: 21px; text-align: center; font-weight: bold; margin-bottom: 50px; }

            .config-menu{
                ul{ overflow: hidden;
                    li{ width: 33.3333%; float: left; text-align: center;
                        a{ display: inline-block; width: 100%; padding: 10px 0; border: 1px solid #e0e5ee; font-size: 16px; }

                        &.active{
                            a{ background-color: #e0e5ee; }
                        }
                    }
                }
            }
        }
    }
</style>