<template>
    <div class="manage-posts-bx">
        <div class="travel-list-bx">
            <div class="travel-list-content">
                <div class="list-title">
                    <h2>최신 여행지</h2>
                </div>

                <div class="list-bx">
                    <ul>
                        <li v-for="( item, index ) in list" :key="index">
                            <TravelList :mode="postMode" :info="item" :user="item.User" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TravelList from "@/components/common/travel_list";
export default {
    components : {
        TravelList
    },

    layout : "manage",
    data(){
        return{
            postMode : "revision"
        }
    },

    fetch({ store }){
        return store.dispatch( "post/loadAllMyPost", {
            userId : store.state.user.me.id
        });
    },

    computed : {
        me(){
            if( !this.$store.state.user.me ){
                return this.$router.push( "/login" );
            }

            return this.$store.state.user.me;
        },

        list(){
            return this.$store.state.post.list;
        }
    },

    mounted(){

    }
}
</script>

<style lang="scss" scoped>
    
</style>