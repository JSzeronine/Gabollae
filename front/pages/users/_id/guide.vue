<template>
    <div v-if="other" class="following-list-bx">
        <ul>
            <li v-for="( item, index ) in guidings" :key="index">
                <Guiding :other="item" />
            </li>
        </ul>
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