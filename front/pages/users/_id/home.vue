<template>
    <div>
        <div v-if="other" @click="clickHandler">
            {{ other.intro || '소개글이 없습니다.' }}
        </div>
    </div>
</template>

<script>
export default {
    layout : "userpage",

    computed : {
        other(){
            return this.$store.state.user.other;
        }
    },

    methods : {
        clickHandler(){
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>