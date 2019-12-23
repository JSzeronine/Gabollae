<template>
    <div class="main">
        <Visual />
        <div class="main-content">
            <Search />

            <div class="travel-list-bx">
                <div class="travel-list-content">
                    <div class="list-title">
                        <h2>최신 여행지</h2>
                        <div class="btn_more">
                            <router-link to="">더보기</router-link>
                        </div>
                    </div>

                    <div class="list-bx">
                        <ul>
                            <li v-for="( post, index ) in all" :key="index">
                                <TravelList :info="post" :user="post.User" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Visual from '@/components/main/visual';
import Search from '@/components/common/search';
import TravelList from "@/components/common/travel_list";

import { mapState } from "vuex";

export default {
    components : {
        Visual,
        Search,
        TravelList
    },

    data() {
        return {
            
        }
    },

    fetch({ store }){
        return store.dispatch( "post/allPost" )
    },

    computed : {
        ...mapState( "post", [
            "all"
        ])
    },

    mounted(){
        
    },

    methods : {

    }
}

</script>

<style lang="scss" scoped>
</style>