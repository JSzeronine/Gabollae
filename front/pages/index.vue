<template>
    <div class="main">
        <Visual />
        <div class="main-content">
            <Search />
            <TravelList />
        </div>
    </div>
</template>

<script>
import Visual from '@/components/main/visual';
import Search from '@/components/common/search';
import TravelList from '@/components/common/travel_list';

export default {
    components : {
        Visual,
        Search,
        TravelList,
        
    },

    data() {
        return {
            
        }
    },

    mounted(){

    },

    methods : {

    }
}

</script>

<style lang="scss" scoped>
    
</style>