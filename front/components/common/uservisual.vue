

<template>
    <div>        
        <div class="user-visual">
            <div class="visual-bg" :style="{ backgroundImage : 'url( /images/common/list_sample.jpg )' }"></div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .user-visual{ margin-bottom: 20px;
        .visual-bg{ height: 350px; background-repeat: no-repeat; background-size: cover; background-position: center; 
            margin-bottom: 10px;
        }
    }
</style>