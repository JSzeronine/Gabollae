<template>
    <div v-if="other">
        {{ other.intro }}
    </div>
</template>

<script>
export default {
    layout : "userpage",

    computed : {
        other(){
            return this.$store.state.user.other;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>