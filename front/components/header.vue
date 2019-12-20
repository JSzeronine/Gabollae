<template>
    <div class="header">
        <div class="header-content">
            <div class="logo-bx">
                <router-link to="/">
                    <img src="/images/common/btn_hamburger.png" alt="">
                </router-link>
                <!-- <router-link class="logo" to="/">
                    <img src="/logo.jpg" alt="">
                </router-link> -->
            </div>

            <div class="menu-bx">
                <ul>
                    <li v-if="me">
                        <router-link :to="`/users/${ me.id }/home`">{{ me.nickname + " 님 안녕하세요" }}</router-link>
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
                console.log( "로그아웃!" );
                vm.$router.push( "/login" );
            });
        }
    }
}

</script>

<style lang="scss" scoped>
    .header{ border-bottom: 1px solid #ccc;
        .header-content{ padding: 20px; overflow: hidden;
            .logo-bx{ float: left;
                .btn-hamburger{ position: relative; top: 5px; margin-right: 10px; }
                .logo{ display: inline-block; width: 95px;
                    img{ width: 100%; }
                }
            }

            .menu-bx{ float: right; position: relative; top: 4px;
                ul{ font-size: 0;
                    li{ display: inline-block; margin-right: 15px;
                        a{ font-size: 20px; font-size: 14px; }

                        &:last-child{ margin-right: 0px; }
                    }
                }
            }
        }   
    }
</style>