<template>
    <div class="follower-bx">
        <div class="photo">
            <a v-if="other.photo" href="javascript:;" :style="{ backgroundImage : `url( ${ getResourceURL }${ other.photo })`}"></a>
            <a v-else href="javascript:;" :style="{ backgroundImage : `url( /images/common/default.jpg )`}"></a>
        </div>

        <div class="intro-bx">
            <div class="nickname text-nowrap1">
                <a href="javascript:;">
                    {{ other.nickname }}
                </a>
            </div>
            
            <div class="btn-group">
                <a v-if="onUnGuide" class="btn" @click="clickUnGuide" href="javascript:;">가이드 거절</a>
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

        onUnGuide(){
            return this.me && this.me.id !== this.other.id && this.me.Guider.find( v => v.id === this.other.id );
        }
    },

    mounted(){
        console.log( this.other );
    },

    methods : {
        clickUnGuide(){
            this.$store.dispatch( "user/unguider", {
                otherId : this.other.id
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .follower-bx{ padding: 15px 10px; border: 1px solid #e0e5ee; display: inline-block; width: 300px;
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