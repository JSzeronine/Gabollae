<template>
    <div class="wrap">
        <Header/>
        <nuxt />
    </div>
</template>

<script>
import Vue from "vue";
import Header from '@/components/header';
import Global from '@/plugins/global';

if (process.browser) {
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
    Vue.use(VueAwesomeSwiper)
}

Vue.use( Global );

export default {
    components : {
        Header
    },
}
</script>

<style>
</style>