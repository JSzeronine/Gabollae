<template>
    <div class="main-visual">
        <div v-swiper:mySwiper="visualSwiperOption" class="main-visual__list">
            <ul class="swiper-wrapper">
                <li class="swiper-slide">
                    <router-link to="/"></router-link>
                </li>
                <li class="swiper-slide">
                    <router-link to="/"></router-link>
                </li>
                <li class="swiper-slide">
                    <router-link to="/"></router-link>
                </li>
                <li class="swiper-slide">
                    <router-link to="/"></router-link>
                </li>
                <li class="swiper-slide">
                    <router-link to="/"></router-link>
                </li>
            </ul>

            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            visualSwiperOption : {
                loop : true,
                pagination : {
                    el : ".swiper-pagination"
                }
            }
        }
    },

    methods : {

    }
}
</script>

<style lang="scss" scoped>
    // @import "visual.scss";
    .main-visual{ margin-bottom: 10px;
    .main-visual__list{
        ul{ position: relative; width: 100%; height: 350px;
            li{ 
                a{ display: block; width: 100%; height: 350px; background-image: url( ~static/images/common/banner_sample.jpg ); background-size: cover; background-position: center; }
                
            }
        }
    }
}

</style>