<template>
    <div class="search-bx">
        <div class="search-input">
            <input type="text">
            <a class="btn-search" href="javascript:;">
                <img src="/images/common/btn_search.png" alt="">
            </a>
        </div>

        <div class="search-tag">
            <ul>
                <li><router-link to="">강릉</router-link></li>
                <li><router-link to="">서울</router-link></li>
                <li><router-link to="">부산</router-link></li>
                <li><router-link to="">강릉</router-link></li>
                <li><router-link to="">서울</router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .search-bx{ position: relative; width: 500px; margin: 0 auto;  margin-bottom: 50px;
        .search-input{ margin-bottom: 5px;
            input{ font-size: 18px; padding: 10px; border: 1px solid #cccccc; width: 100%; border-radius: 50px; }
            .btn-search{ position: absolute; right: 0; width: 43px; height: 43px; box-sizing: border-box; padding: 8px;
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