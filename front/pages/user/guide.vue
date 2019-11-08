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

        <div class="following-list-bx">
            <ul>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
                <li><Following /></li>
            </ul>
        </div>
    </div>
</template>

<script>
import Following from "@/components/common/following";
import ProfileSmall from "@/components/common/profile_small";

export default {
    components : {
        ProfileSmall,
        Following
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