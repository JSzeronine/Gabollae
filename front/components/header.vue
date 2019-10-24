<template>
    <div class="header">
        <div class="header-content">
            <div class="logo-bx">
                <a class="btn-hamburger" href="javascript:;">
                    <img src="/images/common/btn_hamburger.png" alt="">
                </a>
                <router-link class="logo" to="/">
                    <img src="/logo.jpg" alt="">
                </router-link>
            </div>

            <div class="menu-bx">
                <ul>
                    <li><router-link to="/">로그인</router-link></li>
                    <li><router-link to="/">마이페이지</router-link></li>
                    <li><router-link to="/">고객센터</router-link></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    
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