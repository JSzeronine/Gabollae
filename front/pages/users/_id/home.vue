<template>
    <div class="home">
        <div v-if="other">
            <div class="intro-bx">
                <p v-if="other.intro" v-html="other.intro.replace(/(\n|\r\n)/g, '<br>')"></p>
                <p v-else>소개글이 없습니다.</p>
            </div>

            <div class="travel-list-bx">
                <div class="travel-list-content">
                    <div class="list-title">
                        <h2>최신 여행지</h2>
                        <div class="btn_more">
                            <router-link :to="`/users/${ other.id }/travel`">더보기</router-link>
                        </div>
                    </div>

                    <div v-if="posts.length !== 0" class="list-bx">
                        <ul>
                            <li v-for="( post, index ) in posts" :key="index">
                                <TravelList :info="post" :user="other" />
                            </li>
                        </ul>
                    </div>

                    <div v-else class="error">여행지가 없습니다.</div>
                </div>
            </div>

            <div class="travel-list-bx">
                <div class="travel-list-content">
                    <div class="list-title">
                        <h2>퍼온 여행지</h2>
                        <div class="btn_more">
                            <router-link :to="`/users/${ other.id }/travelshare`">더보기</router-link>
                        </div>
                    </div>

                    <div v-if="sharePosts.length !== 0" class="list-bx">
                        <ul>
                            <li v-for="( item, index ) in sharePosts" :key="index">
                                <TravelList :info="item" :user="other" />
                            </li>
                        </ul>
                    </div>

                    <div v-else class="error">여행지가 없습니다.</div>
                </div>
            </div>

        </div>
    </div>

</template>

<script>
import TravelList from "@/components/common/travel_list";
export default {
    layout : "userpage",

    components : {
        TravelList,
    },

    fetch({ store, params }){
        return store.dispatch( "user/loadOther", {
            userId : params.id
        });
    },

    computed : {
        other(){
            return this.$store.state.user.other;
        },

        posts(){
            let post = [];
            this.other.Posts.forEach(( $item, $index ) => {
                if( $index > 2 ){
                    return;
                }

                post.push( $item );
            });

            return post;
        },

        sharePosts(){
            let post = [];

            console.log( this.other.Shared );

            this.other.Shared.forEach(( $item, $index ) => {
                if( $index > 2 ){
                    return;
                }

                post.push( $item );
            });

            return post;
        }
    },

    mounted(){

    },

    methods : {
        clickHandler(){
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .home{ width: 972px; margin: 0 auto; 
        .intro-bx{ font-size: 15px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        
    }
</style>