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

            <div class="best_user">
                <BestUser />
            </div>

            <div class="travel-list-bx">
                <div class="travel-list-content">
                    <div class="list-title">
                        <h2>인기 태그</h2>
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
import BestUser from "@/components/common/bestUser";

import { mapState } from "vuex";

export default {
    components : {
        Visual,
        Search,
        TravelList,
        BestUser
    },

    data() {
        return {
            metaTitle : "가고보자",
            metaTitleList : [
                ".....................🚗 가고보자",
                "....................🚗 가고보자.",
                "...................🚗 가고보자..",
                "..................🚗 가고보자...",
                ".................🚗 가고보자....",
                "................🚗 가고보자.....",
                "...............🚗 가고보자......",
                "..............🚗 가고보자.......",
                ".............🚗 가고보자........",
                "............🚗 가고보자.........",
                "...........🚗 가고보자..........",
                "..........🚗 가고보자...........",
                ".........🚗 가고보자............",
                "........🚗 가고보자.............",
                ".......🚗 가고보자..............",
                "......🚗 가고보자...............",
                ".....🚗 가고보자................",
                "....🚗 가고보자.................",
                "...🚗 가고보자..................",
                "..🚗 가고보자...................",
                ".🚗 가고보자....................",
                "🚗 가고보자.....................",
            ]
        }
    },

    fetch({ store }){
        store.dispatch( "post/allHashtag" );
        return store.dispatch( "post/allPost" );
    },

    computed : {
        ...mapState( "post", [
            "all"
        ]),

        allHashtags(){
            return this.$store.state.post.allHashtags
        }
    },

    mounted(){
        let vm = this;
        let count = 0;
        let index = 0;
        let title = this.metaTitleList[ 0 ];

        setInterval(() => {
            count++;

            index = count % vm.metaTitleList.length;
            this.metaTitle = this.metaTitleList[ index ];
        }, 250 );

        this.allHashtags.forEach(( $item ) => {
            console.log( $item );
        });
    },

    methods : {
    },

    head(){
        return{
            title : this.metaTitle
        }
    }
}

</script>

<style lang="scss" scoped>
</style>