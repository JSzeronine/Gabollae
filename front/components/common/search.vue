<template>
    <div class="search-bx">
        <div class="search-input">
            <span>#</span>
            <input placeholder="검색" v-model="searchText" type="text" @keydown.enter="clickSearch">
            <a class="btn-search" href="javascript:;" @click="clickSearch">
                <img src="/images/common/btn_search.png" alt="">
            </a>
        </div>

        <div class="search-tag">
            <ul>
                <li v-for="( hashtag, index ) in hashtags" :key="index">
                    <router-link class="text-nowrap1" :to="`/hashtag/${ hashtag.content }`">
                        {{ `#${ hashtag.content }` }}<span>{{`(${ hashtag.count })`}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchText : null,
        }
    },

    computed : {
        hashtags(){
            return this.$store.state.post.allHashtags;
        }
    },

    methods : {
        clickSearch(){
            this.goLink.HASHTAG( this.searchText );
        }
    }
}
</script>

<style lang="scss" scoped>
    .search-bx{ position: relative; margin: 0 auto; width: 973px; text-align: center;
        .search-input{ margin-bottom: 5px; width: 400px; display: inline-block; position: relative;
            span{ font-size: 14px; position: absolute; left: 15px; top: 7px; color: #666; }
            input{ color: #666; font-size: 14px; padding: 6px; border: 1px solid #dddddd; width: 100%; border-radius: 50px; padding-left: 25px; }
            .btn-search{ position: absolute; right: 0; box-sizing: border-box; padding: 8px; top: 1px;
                img{ width: 100%; }
            }
        }

        .search-tag{
            ul{ 
                li{ display: inline-block; margin-right: 10px;
                    a{ font-size: 15px; color: #666; display: inline-block; padding: 10px 0px 10px 0px; border-right: none; max-width: 150px; 
                        &:hover, &:active{
                            color: #000;
                        }
                        span{ font-size: 13px; color: #999; }
                    }
                }
            }
        }
    }
</style>