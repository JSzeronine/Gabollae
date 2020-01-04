<template>
    <div class="header">
        <div class="header-content">
            <div class="logo-bx">
                <router-link to="/">
                    <!-- <img src="/images/common/btn_hamburger.png" alt=""> -->
                    <img src="/images/logo.png" alt="">
                </router-link>
            </div>

            <div class="menu-bx">
                <ul>
                    <li v-if="me">
                        <router-link :to="`/users/${ me.id }/home`">{{ `...hi ${ me.nickname }` }}</router-link>
                    </li>

                    <li v-if="me">
                        <router-link :to="`/users/${ me.id }/home`">{{ `바로가기` }}</router-link>
                    </li>

                    <li v-if="!me"><router-link v-if="!me" to="/login">로그인</router-link></li>
                    <li v-if="!me"><router-link to="/signup">회원가입</router-link></li>
                    <li><router-link to="/postwrite">글쓰기</router-link></li>
                    <li v-if="me">
                        <a @click="logout" href="javascript:;">
                            로그아웃
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    computed : {
        me(){
            return this.$store.state.user.me;
        }
    },

    methods : {
        logout(){
            const vm = this;
            this.$store.dispatch( "user/logout" ).then(() => {
                vm.goLink.LOGIN();
            });
        }
    }
}

</script>

<style lang="scss" scoped>
    .header{ width: 1280px; margin: 0 auto;
        .header-content{ overflow: hidden; padding: 0 10px;
            .logo-bx{ float: left; 
                a{ display: inline-block; padding: 10px 0; 
                    img{ width: 100%; }
                }
            }

            .menu-bx{ float: right; position: relative; top: 2px;
                ul{ font-size: 0;
                    li{ display: inline-block; margin-right: 15px; padding: 15px 0;
                        a{ font-size: 15px; color: #000; }

                        &:last-child{ margin-right: 0px; }
                    }
                }
            }
        }   
    }
</style>