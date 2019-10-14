<template>
    <div class="main-visual">
        <div class="main-visual__list">
            <ul>
                <li>
                    <router-link to="/"></router-link>
                </li>
                <li>
                    <router-link to="/"></router-link>
                </li>
                <li>
                    <router-link to="/"></router-link>
                </li>
                <li>
                    <router-link to="/"></router-link>
                </li>
                <li>
                    <router-link to="/"></router-link>
                </li>
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
                a{ display: block; width: 100%; height: 350px; background-image: url( ~static/images/common/banner_sample.jpg ); background-size: cover; background-position: center; }
                
            }
        }
    }
}

</style>