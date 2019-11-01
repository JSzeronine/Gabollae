<template>
    <div>
        <div class="photo">
            <a href="javascript:;" :style="{ backgroundImage : 'url( /images/common/profile.png )'}"></a>
        </div>

        <div class="intro-bx">
            <div class="nickname">
                <a href="javascript:;">Zeronine</a>
            </div>
            
            <div class="btn-group">
                <a class="btn" href="javascript:;">가이드 끊기</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .photo{ position: absolute; margin-right: 10px; 
        a{ 
            display: inline-block; width: 50px; height: 50px; background-color: #d3d3d3; border: 1px solid #d3d3d3; border-radius: 100%; overflow: hidden; 
            background-repeat: no-repeat; background-size: cover; background-position: center;
        }
    }

    .intro-bx{ padding-left: 60px; padding-top: 5px; 
        .nickname{ margin-bottom: 5px; 
            a{ font-size: 13px; color: #725898; }
        }

        .intro{ font-size: 13px; margin-bottom: 10px; line-height: 20px; }
        .btn-group{
            .btn{ margin-right: 5px; }
        }
    }
</style>