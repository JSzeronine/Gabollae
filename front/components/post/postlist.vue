<template>
    <div class="postlist-bx">
        <div class="bx">
            <div class="thumbnail" :style="{ backgroundImage : 'url( /images/uploads/IMG_0134.JPG )'}">
            </div>

            <div class="info">
                <dl>
                    <dt class="title">
                        강릉 여행기~!
                    </dt>
                    <dd class="content">
                        카페에서 호다닥 드로잉~
                        스케치는 더러운게 제 맛!ㅎㅎㅎ
                        치마 자주 입는 울언니 추우니까
                        모자💂🏻‍♀️목도리🧣양말🧦 준비 땅!
                    </dd>
                    <dd class="user">
                        <a href="javascript:;">
                            제로나인
                        </a>
                    </dd>
                    <dd class="like">
                        좋아요<span> 20</span>
                    </dd>
                </dl>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
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
                            a{ font-size: 14px; color: #725898; }
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