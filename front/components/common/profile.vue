<template>
    <div class="profile">
        <div class="photo">
            <router-link v-if="other.photo" :to="`/user/${ other.id }`" :style="{ backgroundImage : 'url(http://localhost:3085/' + other.photo + ')'}">
            </router-link>
        </div>
        <div class="intro-bx">
            <div class="nickname">
                <router-link :to="`/user/${ other.id }`">
                    {{ other.nickname }}
                    <span class="follow-value">
                        가이드 <span class="follow-count">9999+</span>
                    </span>
                </router-link>
            </div>
            <div class="intro" v-html="other.intro.replace(/(\n|\r\n)/g, '<br>')"></div>
            <div class="follow">
                <a class="btn" href="javascript:;">여행 가이드 등록</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        data(){
            return{

            }
        },

        computed : {
            other(){
                return this.$store.state.post.other;
            },
        },

        mounted(){
        }
    }
</script>

<style lang="scss" scoped>
    .profile{ overflow: hidden;
        .photo{ margin-right: 10px; position: absolute;
            a{ 
                display: inline-block;
                width: 70px; height: 70px; background-color: #d3d3d3; border: 1px solid #d3d3d3; border-radius: 100%; overflow: hidden; 
                background-repeat: no-repeat; background-size: cover; background-position: center;
            }
        }

        .intro-bx{ padding-top: 10px; padding-left: 90px;
            .nickname{ margin-bottom: 5px;
                a{ font-size: 16px; color: #725898; 
                    .follow-value{ font-size: 13px; color: #0d0d0d; }
                }
            }
            .intro{ font-size: 13px; margin-bottom: 10px; }
            .follow{ font-size: 13px; }
        }
    }
</style>