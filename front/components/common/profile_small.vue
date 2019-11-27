<template>
    <div class="profile">
        <div class="photo">
            <a href="javascript:;" :style="{ backgroundImage : `url( http://localhost:3085/${ other.photo })` }"></a>
        </div>
        <div class="intro-bx">
            <div class="nickname">
                <router-link to="">
                    <span>{{ other.nickname }}</span>
                    <span class="follow-value">
                        가이드 <span class="follow-count">{{ `: ${ totalGuider }명` }}</span>
                    </span>
                </router-link>
            </div>
            <div class="follow">
                <a v-if="onGuide" class="btn" @click="clickGuide" href="javascript:;">가이드 등록</a>
                <a v-if="onUnGuide" class="btn" @click="clickUnGuide" href="javascript:;">가이드 끊기</a>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        props : {
            other : Object,
        },

        data(){
            return{

            }
        },

        computed : {
            me(){
                return this.$store.state.user.me;
            },

            onGuide(){
                return this.me && this.me.id !== this.other.id && !this.me.Guiding.find( v => v.id === this.other.id );
            },

            onUnGuide(){
                return this.me && this.me.id !== this.other.id && this.me.Guiding.find( v => v.id === this.other.id );
            },

            totalGuider(){
                return this.other.Guider.length;
            }
        },

        mounted(){
            
        },

        methods : {
            clickGuide(){
                this.$store.dispatch( "user/guide", {
                    userId : this.other.id
                });
            },

            clickUnGuide(){
                this.$store.dispatch( "user/unguide", {
                    userId : this.other.id
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .profile{ overflow: hidden; min-height: 70px; height: 100%;
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

            .follow{ font-size: 13px; }
        }
    }
</style>