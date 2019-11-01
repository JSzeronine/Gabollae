<template>
    <div>
        TEST
        <ul>
            <li v-for="( item, index ) in list" :key="index">
                <span>{{ item.id }}</span>:<span>{{ item.data }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";
import Find from "@/plugins/find";
export default {
    data(){
        return{
            list : []
        }
    },

    mounted(){
        this.show();
    },

    methods : {

        async show(){
            let num = await this.load();
            console.log( num );
        },

        load(){
            return new Promise(( resolve, reject ) => {
                setTimeout(() => {
                    resolve( 10 );
                }, 1000 );
            });
        }
    }
}
</script>

<style lang="scss" scoped>
</style>