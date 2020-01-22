<template>
    <div>
        <BestUser :user="groupTest" />
    </div>
</template>

<script>
import BestUser from "@/components/common/bestUser";
export default {
    components : {
        BestUser
    },

    fetch({ store }){
        return store.dispatch( "user/grouptest" )
    },

    computed : {
        groupTest(){
            return this.$store.state.user.grouptest.bestUser;
        },

        hitPost(){
            return this.$store.state.user.grouptest.hitPost;
        }
    },

    mounted(){
        this.groupTest.forEach(( $item ) => {
            console.log( $item );
        });

        this.hitPost.forEach(( $item ) => {
            console.log( $item );
        })
    }
}

</script>

<style lang="scss" scoped>

</style>