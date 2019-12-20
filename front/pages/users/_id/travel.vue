<template>
    <div v-if="other" class="travel-list-bx">
        <div class="travel-list-content">
            <div class="list-title">
                <h2>최신 여행지</h2>
            </div>

            <div class="list-bx">
                <ul>
                    <li v-for="( item, index ) in other.Posts" :key="index">
                        <TravelList :info="item" :user="other" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import TravelList from "@/components/common/travel_list";
export default {
    layout : "userpage",

    components : {
        TravelList,
    },

    computed : {
        other(){
            return this.$store.state.user.other;
        }
    },
}
</script>

<style lang="scss" scoped>

</style>