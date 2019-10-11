<template>
    <div>
        <Header />
        {{ str }}
        <nuxt />
    </div>
</template>

<script>
    import Header from '@/components/header';
    export default {
        components: {
            Header,
        },

        data() {
            return {
                str: "zeronine"
            }
        },
    }
</script>

<style lang="scss" scoped>
    
</style>