<template>
    <div class="postlist-bx">
        <div class="bx">
            <router-link :to="`/post/${ info.id }`">
                <div class="thumbnail" :style="{ backgroundImage : `url( http://localhost:3085/${ info.src })` }">
                </div>
            </router-link>

            <div class="info">
                <dl>
                    <dt class="title">
                        {{ info.title }}
                    </dt>
                    <dd class="content">
                        {{ info.content }}
                    </dd>
                    <dd class="user">
                        <a href="javascript:;">
                            제로나인
                            <span class="follow-value">
                                가이드 <span class="follow-count">9999+</span>
                            </span>
                        </a>
                    </dd>
                    <dd class="like">
                        가볼래 <span>9999+</span>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        info : Object
    },

    data(){
        return{

        }
    },

    mounted(){
        console.log( this.info.content );
        console.log( this.info.id );
        console.log( this.info.src );
        console.log( this.info.title );
    }
}
</script>

<style lang="scss" scoped>
    .postlist-bx{
        .bx{ overflow: hidden;
            .thumbnail{ width: 145px; height: 100px; background-repeat: no-repeat; background-size: cover; background-position: center;
                float: left;
                
            }

            .info{ width: 335px; float: left; box-sizing: border-box; padding-left: 10px;
                dl{
                    dt{ white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 15px; margin-bottom: 5px; }
                    dd{
                        white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 5px;
                        &.content{ font-size: 13px;
                            height: 34px; white-space: normal; 
                            word-wrap: break-word; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
                        }

                        &.user{ 
                            a{ font-size: 14px; color: #725898; 
                                .follow-value{ font-size: 13px; color: #0d0d0d; }
                            }
                        }

                        &.like{ margin-bottom: 0;
                            font-size: 12px;
                            span{ font-size: 12px; }
                        }
                    }
                }
            }
        }
    }
</style>