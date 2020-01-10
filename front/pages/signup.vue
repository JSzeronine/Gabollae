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

                <div class="name-bx">
                    <input class="default-input-type" type="text" v-model="userName" placeholder="이름">
                </div>

                <div class="birth-bx">
                    <input class="default-input-type" type="text" v-model="birth" placeholder="생년월일 예:19830711">
                </div>

                <div class="nickname-bx">
                    <input type="text" v-model="nickname" autocomplete="false" placeholder="닉네임">
                </div>

                <div class="password-bx">
                    <input type="password" v-model="password" autocomplete="false" placeholder="비밀번호">
                </div>

                <div class="password-confirm-bx">
                    <input type="password" v-model="passwordConfirm" autocomplete="false" placeholder="비밀번호 확인">
                </div>
            </div>

            <div class="signup-check-bx">
                <div class="agree-check">
                    <input type="checkbox" id="checkbx-id" v-model="checked">
                    <label for="checkbx-id">
                        <span class="icon-checkbx"></span>
                        <span class="text-checkbx">위치 정보 동의</span>
                    </label>
                </div>

                <div class="agree-text">
                    <textarea name="" id="" cols="30" rows="10">
사진의 위치 정보 공유에 동의해주세요!
게시글을 올릴 시, 위치 노출을 안해도 됩니다.
                    </textarea>
                </div>
            </div>

            <div class="signup-btn-bx">
                <a @click="signup" href="javascript:;">
                    가입하기
                </a>
            </div>
        </div>
    </div>
</template>

<script src="@/assets/js/pages/signup.js"></script>
<style lang="scss" src="@/assets/scss/pages/signup.scss" scoped></style>