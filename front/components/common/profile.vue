<template>
    <div class="profile">
        <div class="photo">
            <a href="javascript:;" :style="{ backgroundImage : 'url(' + me.photo + ')'}"></a>
        </div>
        <div class="intro-bx">
            <div class="nickname">
                <a href="javascript:;">
                    {{ me.nickname }}
                </a>
            </div>
            <div class="intro" v-html="me.intro"></div>
            <div class="follow">
                <a class="btn" href="javascript:;">친구맺기</a>
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
            ...mapState( "user", [ 
                "me" ])
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
                a{ font-size: 16px; color: #725898; }
            }
            .intro{ font-size: 13px; margin-bottom: 10px; }
            .follow{ font-size: 13px; }
        }
    }
</style>