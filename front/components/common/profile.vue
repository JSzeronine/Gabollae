<template>
    <div class="profile">
        <div class="photo">
            <router-link v-if="other.photo" :to="`/users/${ other.id }/home`" :style="{ backgroundImage : `url(${ getResourceURL }${ other.photo })`}"></router-link>
            <router-link v-else :to="`/users/${ other.id }/home`" :style="{ backgroundImage : `url( /images/common/default.jpg )`}"></router-link>
        </div>
        <div class="intro-bx" :class="{ all : isView }">
            <div class="user-info">
                <div class="nickname">
                    <router-link :to="`/users/${ other.id }/home`">
                        {{ other.nickname }}
                        <span class="follow-value">
                            가이드 <span class="follow-count">{{ totalGuider }}</span>
                        </span>
                    </router-link>
                </div>

                <div v-if="other.intro" class="intro" v-html="other.intro.replace(/(\n|\r\n)/g, '<br>')"></div>
                <div v-else>소개글이 없습니다.</div>
            </div>

            <div class="follow">
                <a v-if="onGuide" class="btn" @click="clickGuide" href="javascript:;">가이드 등록</a>
                <a v-if="onUnGuide" class="btn" @click="clickUnGuide" href="javascript:;">가이드 끊기</a>
            </div>
        </div>
        <div v-if="other.intro" class="btn-view">
            <a href="javascript:;" @click="clickView">
                {{ ( isView ) ? "..간략히 보기" : "..더보기" }}
            </a>
        </div>
            
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        data(){
            return{
                isView : false,
            }
        },

        computed : {
            me(){
                return this.$store.state.user.me;
            },

            other(){
                return this.$store.state.post.content.User;
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
            },

            clickView(){
                this.isView = !this.isView;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .profile{ 
        .photo{ margin-right: 10px; position: absolute; width: 70px; height: 70px; background-color: #d3d3d3; border: 1px solid #d3d3d3; border-radius: 100%; overflow: hidden;
            a{ 
                display: inline-block; width: 100%; height: 100%;
                background-repeat: no-repeat; background-size: cover; background-position: center;
            }
        }

        .intro-bx{ padding-top: 10px; padding-left: 90px; position: relative; overflow: hidden; height: 80px;
            &.all{ height: auto; }
            .user-info{
                .nickname{ margin-bottom: 5px;
                    a{ font-size: 16px; color: #725898; 
                        .follow-value{ font-size: 13px; color: #0d0d0d; }
                    }
                }
                .intro{ font-size: 13px; margin-bottom: 10px; }
            }

            .follow{ font-size: 13px; position: absolute; top: 0; right: 10px; }
        }

        .btn-view{ padding-left: 90px;
            a{ font-size: 13px; color: #1360d1; }
        }
    }
</style>