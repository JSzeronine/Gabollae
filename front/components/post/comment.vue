<template>
    <div class="comment">
        <div class="comment-bx">
            <div v-if="me" class="comment-input-bx">
                <p class="comment-title">댓글을 달아주세요.</p>
                <textarea v-model="content"></textarea>
                <div class="btn-group">
                    <a class="btn" @click="addComment" href="javascript:;">댓글 달기</a>
                </div>
            </div>

            <div v-else class="comment-input-bx">
                <div class="btn-group">
                    <router-link to="/login">
                        로그인 후 댓글달기
                    </router-link>
                </div>
            </div>

            <ul class="comment-list">
                <li v-for="( item, index ) in comments" :key="index">
                    <div class="photo">
                        <a href="javascript:;" :style="{ backgroundImage : `url(http://localhost:3085/${ item.User.photo })`}"></a>
                    </div>

                    <div class="intro-bx">
                        <div class="nickname">
                            <router-link :to="`/user/${ item.User.id }`">{{ item.User.nickname }}</router-link>
                        </div>

                        <div class="intro" v-html="item.content.replace(/(?:\r\n|\r|\n)/g, '<br />')"></div>
                        <div>
                            {{ item.createdAt }}
                        </div>
                        <div class="btn-group">
                            <a class="btn" href="javascript:;">댓글 달기</a>
                            <a v-if="me.id == other.id || me.id == item.User.id" @click="removeComment( item )" class="btn" href="javascript:;">삭제</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>    
</template>

<script>
import { mapState } from "vuex";

export default {
    data(){
        return{
            content : null,
        }
    },

    computed : {
        me(){
            return this.$store.state.user.me;
        },

        post(){
            return this.$store.state.post.content;
        },

        other(){
            return this.$store.state.post.content.User;
        },

        ...mapState( "post", [
            "comments"
        ])
    },

    mounted(){
        
    },

    methods : {
        addComment(){
            this.$store.dispatch( "post/addComment", {
                userId : this.me.id,
                postId : this.post.id,
                content : this.content
            });

            this.content = "";
        },

        removeComment( $data ){
            this.$store.dispatch( "post/removeComment", {
                commentId : $data.id
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .comment{
        .comment-bx{ overflow: hidden; 
            .comment-input-bx{ width: 100%; margin-bottom: 10px;
                .comment-title{ font-size: 12px; color: #0d0d0d; margin-bottom: 5px; }
                textarea{ border: 1px solid #0d0d0d; font-size: 14px; padding: 8px; width: 100%; }
            }

            .comment-list{
                li{ margin-bottom: 10px;
                    .photo{ position: absolute; margin-right: 10px; 
                        a{ 
                            display: inline-block; width: 50px; height: 50px; background-color: #d3d3d3; border: 1px solid #d3d3d3; border-radius: 100%; overflow: hidden; 
                            background-repeat: no-repeat; background-size: cover; background-position: center;
                        }
                    }

                    .intro-bx{ padding-left: 60px; padding-top: 5px; 
                        .nickname{ margin-bottom: 5px; 
                            a{ font-size: 13px; color: #725898; }
                        }

                        .intro{ font-size: 13px; margin-bottom: 10px; line-height: 20px; }
                        .btn-group{
                            .btn{ margin-right: 5px; }
                        }
                    }
                }
            }
        }
    }
</style>
