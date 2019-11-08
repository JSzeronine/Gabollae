<template>
    <div class="login">
        <div class="login-bx">
            <div class="login-title">
                <h2>로그인</h2>
            </div>

            <div class="login-container">
                <div class="email-bx">
                    <input class="default-input-type" type="text" v-model="email" placeholder="이메일">
                </div>

                <div class="password-bx">
                    <input type="password" v-model="password" placeholder="비밀번호">
                </div>
            </div>

            <div class="agree-check">
                <input type="checkbox" id="checkbx-id" v-model="checked">
                <label for="checkbx-id">
                    <span class="icon-checkbx"></span>
                    <span class="text-checkbx">로그인 상태 유지</span>
                </label>
            </div>

            <div class="login-btn-bx">
                <a @click="showLogin" href="javascript:;">
                    로그인
                </a>
            </div>
        </div>
    </div>
</template>

<script src="@/assets/js/pages/login.js"></script>
<style lang="scss" src="@/assets/scss/pages/login.scss" scoped></style>