<template>
    <div class="search-bx">
        <div class="search-input">
            <span>#</span>
            <input placeholder="검색" v-model="searchText" type="text" @keydown.enter="clickSearch">
            <a class="btn-search" href="javascript:;" @click="clickSearch">
                <img src="/images/common/btn_search.png" alt="">
            </a>
        </div>

        <!-- <div class="search-tag">
            <ul>
                <li><router-link to="">강릉</router-link></li>
                <li><router-link to="">서울</router-link></li>
                <li><router-link to="">부산</router-link></li>
                <li><router-link to="">강릉</router-link></li>
                <li><router-link to="">서울</router-link></li>
            </ul>
        </div> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchText : null,
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
    .search-bx{ position: relative; width: 400px; margin: 0 auto; 
        .search-input{ margin-bottom: 5px;
            span{ font-size: 14px; position: absolute; left: 10px; top: 7px; }
            input{ font-size: 14px; padding: 6px; border: 1px solid #dddddd; width: 100%; border-radius: 50px; padding-left: 25px; }
            .btn-search{ position: absolute; right: 0; box-sizing: border-box; padding: 8px; top: 1px;
                img{ width: 100%; }
            }
        }

        .search-tag{
            ul{ overflow: hidden;
                li{ float: left; 
                    a{ font-size: 15px; color: #666; display: inline-block; border: 1px solid #ccc; padding: 10px 35px; border-right: none; }
                    &:last-child{ border-right: 1px solid #ccc; 
                        a{ padding-left: 37px; }
                    }
                }
            }
        }
    }
</style>