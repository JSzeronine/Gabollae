<template>
    <div class="follow">
        <div class="follow-bx">
            <ul class="follow-menu">
                <li class="active"><a href="javascript:;">나의 가이드</a></li>
                <li><a href="javascript:;">내가 가이드</a></li>
            </ul>
        </div>

        <div class="following-list-bx">
            <ul>
                <li>
                    <Following />
                </li>
            </ul>
        </div>

        <div class="follower-list-bx">
            <ul>
                <li>
                    <Follower />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>


import Following from "@/components/common/following";
import Follower from "@/components/common/follower";

export default {
    layout : "manage",
    data(){
        return{
            
        }
    },

    components : {
        Following,
        Follower
    }
}



</script>

<style lang="scss" scoped>
    .follow{ padding-top: 50px;
        .follow-bx{
            ul{ overflow: hidden;
                li{ width: 50%; float: left; text-align: center;
                    a{ display: inline-block; width: 100%; padding: 10px 0; border: 1px solid #e0e5ee; font-size: 16px; }

                    &.active{
                        a{ background-color: #e0e5ee; }
                    }
                }
            }
        }
    }

</style>