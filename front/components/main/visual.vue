<template>
    <div class="main-visual">
        <div class="main-visual__list">
            <ul>
                <li><router-link to="/" style="background-image:url( /images/common/banner_sample.jpg );"></router-link></li>
                <li><router-link to="/" style="background-image:url( /images/common/banner_sample.jpg );"></router-link></li>
                <li><router-link to="/" style="background-image:url( /images/common/banner_sample.jpg );"></router-link></li>
                <li><router-link to="/" style="background-image:url( /images/common/banner_sample.jpg );"></router-link></li>
                <li><router-link to="/" style="background-image:url( /images/common/banner_sample.jpg );"></router-link></li>
            </ul>
        </div>
    </div>
</template>

<script>
import TweenMax from 'gsap';
export default {
    
    data(){
        return{

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
            li{ position: absolute; width: 100%;
                a{ display: block; 
                    background-image : url( /images/common/banner_sample.jpg );
                    // background-image : url( ~@/assets/banner_sample.jpg );
                    background-image: none; background-size: cover; background-position: center; height: 350px;
                }
            }
        }
    }
}

</style>