<template>
    <div class="signup">
        {{ hello }}
    </div>
</template>

<script>
export default {
    layout : "signup",
    data(){
        return{
            hello : "Hello Signup"
        }
    }
}
</script>

<style lang="scss" scoped>
    .signup{
        font-size: getPx();
        font-family: "Nanum Gothic";
    }
</style>