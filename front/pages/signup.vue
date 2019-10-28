<template>
    <div class="signup">
        <div class="signup-bx">
            <div class="signup-title">
                <h2>회원가입</h2>
            </div>

            <div class="signup-container">
                <div class="email-bx">
                    <input class="default-input-type" type="text" v-model="email" placeholder="이메일">
                </div>

                <div class="password-bx">
                    <input type="text" v-model="password" placeholder="비밀번호">
                </div>

                <div class="password-confirm-bx">
                    <input type="text" v-model="passwordConfirm" placeholder="비밀번호 확인">
                </div>

                <div class="nickname-bx">
                    <input type="text" v-model="nickname" placeholder="닉네임">
                </div>
            </div>

            <div class="signup-btn-bx">
                <a href="javascript:;">
                    가입하기
                </a>
            </div>
        </div>
    </div>
</template>

<script src="@/assets/js/pages/signup.js"></script>
<style lang="scss" src="@/assets/scss/pages/signup.scss" scoped></style>