<template>
    <div v-if="other" class="following-list-bx">
        <h2>가이드</h2>
        <ul v-if="guidings.length !== 0">
            <li v-for="( item, index ) in guidings" :key="index">
                <Guiding :other="item" />
            </li>
        </ul>

        <div v-else>가이드가 없습니다.</div>
    </div>
</template>

<script>
import Guiding from "@/components/common/guiding";
export default {
    layout : "userpage",

    components : {
        Guiding
    },

    fetch({ store, params }){
        return store.dispatch( "user/loadGuiding", {
            userId : params.id
        });
    },

    computed : {
        other(){
            return this.$store.state.user.other;
        },

        guidings(){
            return this.$store.state.user.Guidings;
        }
    },

    mounted(){

    }
}
</script>

<style lang="scss" scoped>
    
</style>