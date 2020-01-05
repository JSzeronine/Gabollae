<template>
    <div class="follow">
        <div class="following-list-bx">
            <h2>나의 가이드</h2>
            <ul v-if="guidings.length !== 0">
                <li v-for="( item, index ) in guidings" :key="index">
                    <Guiding :other="item" />
                </li>
            </ul>

            <div v-else class="error">나의 가이드가 없습니다.</div>
        </div>
    </div>
</template>
<script>

import Guiding from "@/components/common/guiding";

export default {
    layout : "manage",
    components : {
        Guiding,
    },

    data(){
        return{
            
        }
    },

    computed : {
        me(){
            if( !this.$store.state.user.me ){
                return this.goLink.LOGIN();
            }

            return this.$store.state.user.me;
        },

        guidings(){
            return this.$store.state.user.Guidings;
        }
    },

    fetch({ store }){
        return store.dispatch( "user/loadGuiding", {
            userId : store.state.user.me.id
        });
    },

    mounted(){
        
    }
}

</script>

<style lang="scss" scoped>
</style>