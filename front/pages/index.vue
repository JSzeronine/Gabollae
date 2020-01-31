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
                            <router-link to="/posts">더보기</router-link>
                        </div>
                    </div>

                    <div class="list-bx">
                        <ul>
                            <li v-for="( post, index ) in newPost" :key="index">
                                <TravelList :info="post" :user="post.User" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="best_user">
                <BestUser :tit="`BEST USER`" :user="bestUser" />
            </div>

            <div class="travel-list-bx">
                <div class="travel-list-content">
                    <div class="list-title">
                        <h2>인기 여행</h2>
                        <div class="btn_more">
                            <router-link to="/hitposts">더보기</router-link>
                        </div>
                    </div>

                    <div class="list-bx">
                        <ul>
                            <li v-for="( post, index ) in hitPost" :key="index">
                                <TravelList :info="post" :user="post.User" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="best_user">
                <BestUser :tit="`LIKE USER`" :user="likeUser" />
            </div>
        </div>
    </div>
</template>

<script>
import Visual from '@/components/main/visual';
import Search from '@/components/common/search';
import TravelList from "@/components/common/travel_list";
import BestUser from "@/components/common/bestUser";

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
                ".......................🚗 가고보자",
                "......................🚗 가고보자",
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
        return Promise.all([
            store.dispatch( "post/allHashtag" ),
            store.dispatch( "post/hitPost" ),
            store.dispatch( "user/loadBestUser" ),
            store.dispatch( "post/newPost" ),
            store.dispatch( "user/loadLikeUser" ),
        ]);
    },

    computed : {
        hitPost(){
            return this.$store.state.post.hitPost;
        },

        newPost(){
            return this.$store.state.post.newPost;
        },

        allHashtags(){
            return this.$store.state.post.allHashtags
        },

        bestUser(){
            return this.$store.state.user.bestUser;
        },

        likeUser(){
            return this.$store.state.user.likeUser;
        }
    },

    mounted(){
        console.log( this.likeUser );

        let vm = this;
        let count = 0;
        let index = 0;
        let title = this.metaTitleList[ 0 ];

        setInterval(() => {
            count++;

            index = count % vm.metaTitleList.length;
            this.metaTitle = this.metaTitleList[ index ];
        }, 250 );
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