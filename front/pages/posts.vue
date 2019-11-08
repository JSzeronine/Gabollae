<template>
    <div class="posts">
        <div class="travel-list-bx">
            <div class="travel-list-content">
                <div class="list-title">
                    <h2>최신 여행지</h2>
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
</template>

<script>
import TravelList from "@/components/common/travel_list";
export default {
    components : {
        TravelList,
    }
}
</script>

<style lang="scss" scoped>
    .posts{ width: 100%; max-width: 1280px; margin: 0 auto; }
</style>