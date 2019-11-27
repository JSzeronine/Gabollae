<template>
    <div class="posts">
        <div class="travel-list-bx">
            <div class="travel-list-content">
                <div class="list-title">
                    <h2>{{ `#${ hashtag }` }}</h2>
                </div>

                <div class="list-bx">
                    <ul>
                        <li v-for="( item, index ) in list" :key="index">
                            <TravelList :info="item" :user="item.User" />
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

    fetch({ store, params }){
        return store.dispatch( "post/hashtag", {
            hashtag : encodeURIComponent( params.id )
        });
    },

    computed : {
        list(){
            return this.$store.state.post.list
        },

        hashtag(){
            return this.$store.state.post.hashtag;
        }
    },

    mounted(){
        
    }
    
}
</script>

<style lang="scss" scoped>
    .posts{ width: 100%; max-width: 1280px; margin: 0 auto; }
</style>