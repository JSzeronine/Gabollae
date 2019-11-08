<template>
    <div class="url-bx">
        <div class="title">
            <h2>경로</h2>
        </div>

        <div class="depth0">
            <ul>
                <li><router-link to="/">Main</router-link></li>
                <li><router-link to="/signup">회원가입</router-link></li>
                <li><router-link to="/login">로그인</router-link></li>

                <li><router-link to="/modification">글쓰기</router-link></li>
                <li><router-link to="/postwrite">글 수정</router-link></li>
                <li><router-link to="/posts">글 목록 보기</router-link></li>
                <li><router-link to="/post">글 보기</router-link></li>

                <li>
                    <router-link to="/user/info">내 페이지</router-link>
                    <div class="depth1">
                        <ul>
                            <li><router-link to="/user/info">정보</router-link></li>
                            <li><router-link to="/user/travel">여행지</router-link></li>
                            <li><router-link to="/user/guide">가이드</router-link></li>
                        </ul>
                    </div>
                </li>

                <li>
                    <router-link to="/manage/info">설정</router-link>
                    <div class="depth1">
                        <ul>
                            <li><router-link to="/manage/info">정보</router-link></li>
                            <li><router-link to="/manage/posts">글 관리</router-link></li>
                            <li><router-link to="/manage/friend">가이드 관리</router-link></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .url-bx{ width: 1280px; margin: 0 auto; padding-top: 100px;
        .title{ margin-bottom: 20px;
            h2{ font-size: 20px; }
        }

        .depth0{
            ul{
                li{ font-size: 18px; margin-bottom: 15px; 
                    .depth1{ padding-left: 20px; margin-top: 5px;
                        ul{
                            li{ font-size: 15px; margin-bottom: 5px; }
                        }
                    }
                }
            }
        }
    }
</style>