<template>
    <div class="follow">
        <div class="follower-list-bx">
            <ul>
                <li v-for="( item, index ) in guiders" :key="index">
                    <Guider :other="item" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

import Guider from "@/components/common/guider";

export default {
    layout : "manage",
    components : {
        Guider
    },

    data(){
        return{
            
        }
    },

    computed : {
        me(){
            if( !this.$store.state.user.me ){
                return this.goLink.LOGIN();
            }

            return this.$store.state.user.me;
        },

        guiders(){
            return this.$store.state.user.Guiders;
        }
    },

    fetch({ store }){
        return store.dispatch( "user/loadGuider", {
            userId : store.state.user.me.id
        });
    },

    mounted(){
        console.log( this.me );
    }
}

</script>

<style lang="scss" scoped>
    .follow{ 
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