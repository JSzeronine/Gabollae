<template>
    <div class="error_page">
        <div class="error-title">존재 하지 않는 페이지 입니다.</div>
        <div>
            <router-link class="btn" to="/">메인으로 이동</router-link>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .error_page{
        text-align: center;
        padding-top: 200px;
        .error-title{
            margin-bottom: 30px;
            font-size: 20px;
        }
    }
</style>