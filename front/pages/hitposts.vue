<template>
    <div class="posts">
        <div class="travel-list-bx">
            <div class="travel-list-content">
                <div class="list-title">
                    <h2>인기 여행</h2>
                </div>

                <div class="list-bx">
                    <ul>
                        <li v-for="( post, index ) in allPost" :key="index">
                            <TravelList :info="post" :user="post.User" />
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
        TravelList,
    },

    fetch({ store }){
        return store.dispatch( "post/hitAll" );
    },

    computed : {
        allPost(){
            return this.$store.state.post.all;
        }
    }
}
</script>

<style lang="scss" scoped>
    .posts{ width: 100%; max-width: 1280px; margin: 0 auto; }
</style>