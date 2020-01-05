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
                    <li v-if="me" class="nickname">
                        <router-link :to="`/users/${ me.id }/home`">
                            <span v-if="me.photo" class="photo" :style="{ backgroundImage : `url( ${ getResourceURL }${ me.photo })` }"></span>
                            <span v-else class="photo" :style="{ backgroundImage : `url( /images/common/default.jpg )` }"></span>
                            <span>{{ `안녕하세요. ${ me.nickname } 님` }}</span>
                        </router-link>
                    </li>

                    <li v-if="me">
                        <router-link :to="`/users/${ me.id }/home`">{{ `My Page` }}</router-link>
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
                        &.nickname{ 
                            a{ font-size: 14px; color: #725898; 
                                .photo{ display:inline-block; width: 25px; height: 25px; position: relative; top: 8px;
                                    background-size: cover; background-repeat: no-repeat; background-position: center;
                                    border-radius: 100%;
                                }
                            }
                        }
                    }
                }
            }
        }   
    }
</style>