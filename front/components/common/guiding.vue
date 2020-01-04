<template>
    <div class="following-bx">
        <div class="photo">
            <a href="javascript:;" :style="{ backgroundImage : `url( ${ getResourceURL }${ other.photo })`}"></a>
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

</style>