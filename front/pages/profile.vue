<template lang="">
    <div class="profile">
        {{ hello }}
    </div>
</template>

<script>
export default {
    data(){
        return{
            hello : "Hello Profile"
        }
    }
}
</script>

<style lang="scss" scoped>
    .profile{
        font-size: getPx();
        font-family: "Nanum Gothic";
    }
</style>