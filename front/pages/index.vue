<template>
    <div class="index">
        {{ hello }}
    </div>
</template>

<script>
export default {
    data() {
        return {
            hello : "Hello Index.vue"
        }
    },
}
</script>

<style lang="scss" scoped>
    .index{
        font-size: getPx();
        font-family: "Nanum Gothic";
    }
</style>