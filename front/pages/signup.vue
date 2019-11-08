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
위치정보 이용약관에 동의하시면, 위치를 활용한 광고 정보 수신 등을 포함하는 네이버 위치기반 서비스를 이용할 수 있습니다.

제 1 조 (목적)
이 약관은 네이버 주식회사 (이하 “회사”)가 제공하는 위치정보사업 또는 위치기반서비스사업과 관련하여 회사와 개인위치정보주체와의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.

제 2 조 (약관 외 준칙)
이 약관에 명시되지 않은 사항은 위치정보의 보호 및 이용 등에 관한 법률, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 전기통신기본법, 전기통신사업법 등 관계법령과 회사의 이용약관 및 개인정보처리방침, 회사가 별도로 정한 지침 등에 의합니다.
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