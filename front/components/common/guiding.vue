<template>
    <div class="following-bx">
        <div class="photo">
            <a href="javascript:;" :style="{ backgroundImage : `url( http://localhost:3085/${ other.photo })`}"></a>
        </div>

        <div class="intro-bx">
            <div class="nickname">
                <router-link :to="`/user/${ other.id }`">
                    {{ other.nickname }}
                </router-link>
            </div>
            
            <div class="btn-group">
                <a v-if="onGuide" class="btn" @click="clickGuide" href="javascript:;">가이드 등록</a>
                <a v-if="onUnGuide" class="btn" @click="clickUnGuide" href="javascript:;">가이드 끊기</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        other : Object
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
    .following-bx{ padding: 15px 10px; border: 1px solid #e0e5ee; display: inline-block; width: 300px; min-height: 80px; position: relative; 
        .photo{ position: absolute; margin-right: 10px; 
            a{ 
                display: inline-block; width: 50px; height: 50px; background-color: #d3d3d3; border: 1px solid #d3d3d3; border-radius: 100%; overflow: hidden; 
                background-repeat: no-repeat; background-size: cover; background-position: center;
            }
        }

        .intro-bx{ padding-left: 60px; padding-top: 5px; 
            .nickname{ margin-bottom: 5px; 
                a{ font-size: 13px; color: #725898; }
            }

            .intro{ font-size: 13px; margin-bottom: 10px; line-height: 20px; }
            .btn-group{
                .btn{ margin-right: 5px; }
            }
        }
    }
</style>