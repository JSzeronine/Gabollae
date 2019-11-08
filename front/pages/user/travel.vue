<template>
    <div class="user-bx">
        <div class="user-visual">
            <div class="visual-bg" :style="{ backgroundImage : 'url( /images/common/list_sample.jpg )' }"></div>
            <ProfileSmall />
        </div>

        <div class="user-btns">
            <ul>
                <li>
                    <router-link class="btn" to="/user/info">홈</router-link>
                    <router-link class="btn" to="/user/travel">여행지</router-link>
                    <router-link class="btn" to="/user/guide">나의 가이드</router-link>
                </li>
            </ul>
        </div>

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
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileSmall from "@/components/common/profile_small";
import TravelList from "@/components/common/travel_list";

export default {
    components : {
        ProfileSmall,
        TravelList,
    }
}
</script>

<style lang="scss" scoped>
    .user-bx{ max-width: 1280px; width: 100%; margin: 0 auto; 
        .user-visual{ margin-bottom: 20px;
            .visual-bg{ width: 1280px; height: 240px; background-repeat: no-repeat; background-size: cover; background-position: center; 
                margin-bottom: 10px;
            }
        }
    }
</style>