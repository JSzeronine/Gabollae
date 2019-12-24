<template>
    <div class="follow">
        <div class="following-list-bx">
            <ul>
                <li v-for="( item, index ) in guidings" :key="index">
                    <Guiding :other="item" />
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

import Guiding from "@/components/common/guiding";

export default {
    layout : "manage",
    components : {
        Guiding,
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

        guidings(){
            return this.$store.state.user.Guidings;
        }
    },

    fetch({ store }){
        return store.dispatch( "user/loadGuiding", {
            userId : store.state.user.me.id
        });
    },

    mounted(){
        
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