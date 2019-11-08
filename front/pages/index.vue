<template>
    <div class="main">
        <Visual />
        <div class="main-content">
            <Search />

            <div class="travel-list-bx">
                <div class="travel-list-content">
                    <div class="list-title">
                        <h2>최신 여행지</h2>
                        <div class="btn_more">
                            <router-link to="">더보기</router-link>
                        </div>
                    </div>

                    <div class="list-bx">
                        <ul>
                            <li><TravelList /></li>
                            <li><TravelList /></li>
                            <li><TravelList /></li>
                            <li><TravelList /></li>
                            <li><TravelList /></li>
                            <li><TravelList /></li>
                            <li><TravelList /></li>
                            <li><TravelList /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Visual from '@/components/main/visual';
import Search from '@/components/common/search';
import TravelList from "@/components/common/travel_list";

export default {
    components : {
        Visual,
        Search,
        TravelList
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