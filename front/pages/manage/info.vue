<template>
    <div class="manage-bx">
        <div v-if="me" class="manage-info">
            <div class="profile-photo-bx">

                <div v-if="photo" class="profile-photo" :style="{ backgroundImage : `url( ${ getResourceURL }${ photo })` }"></div>
                <div v-else class="profile-photo"></div>

                <div class="profile-nickname">{{ me.nickname }}</div>
                <div class="profile-photo-btn">
                    <a class="btn" href="javascript:;" @click="onImageUpload">사진 등록</a>
                    <input ref="imageInput" type="file" hidden @change="onChangeImages">
                </div>
            </div>

            <div class="profile-text">
                <h2>소개</h2>
                <textarea v-model="intro" name="" id="" cols="30" rows="10"></textarea>
            </div>

            <!-- <div class="profile-password">
                <h2>비밀번호 변경</h2>
                <div>
                    <input class="default-input" type="password" placeholder="현재 비밀번호">
                </div>
                
                <div><input class="default-input" type="password" placeholder="변경할 비밀번호"></div>
                <div><input class="default-input" type="password" placeholder="변경할 비밀번호 확인"></div>
            </div> -->

            <div>
                <a @click="changeUserInfo" class="btn-default" href="javascript:;">변경 완료</a>
            </div>
        </div>
    </div>
</template>

<script>
import Profile from "@/components/common/profile";
import { mapState } from "vuex";
import Find from "@/plugins/find";

export default {
    data(){
        return{
            photo : null,
            intro : null
        }
    },

    layout : "manage",
    components : {
        Profile,
    },

    computed : {
        me(){
            if( !this.$store.state.user.me ){
                return this.goLink.LOGIN();
            }

            return this.$store.state.user.me;
        },
    },

    mounted(){
        this.photo = this.me.photo;
        this.intro = this.me.intro;
    },

    methods : {
        onImageUpload(){
            this.$refs.imageInput.click();
        },

        async onChangeImages( $e ){
            const vm = this;
            let input = $e.target;

            let img = await Find.getLoadImage( input.files[ 0 ]);
            let data = img.toDataURL( 'image/jpeg', 1 );

            const imageForData = new FormData();
            imageForData.append( "image", await Find.dataURItoBlob( data ));

            vm.photo = await this.$store.dispatch( "user/uploadPhoto", imageForData )
        },

        changeUserInfo(){
            const vm = this;
            this.$store.dispatch( "user/infoChange", {
                id : this.me.id,
                intro : this.intro
            }).then(( result ) => {
                console.log( "변경 완료" );
                this.goLink.USERPAGE( this.me.id );
            }).catch(( error ) => {
                console.error( error );
            });
        },
    }
}

</script>

<style lang="scss" scoped>
    .manage-bx{ text-align: center; padding-top: 100px;
        .manage-info{ width: 480px; display: inline-block;
            .profile-photo-bx{ margin-bottom: 50px;
                .profile-photo{ display: inline-block; width: 100px; height: 100px; background-repeat: no-repeat; background-size: cover; background-position: center; 
                    border: 1px solid #e0e5ee; border-radius: 100%; overflow: hidden; margin-bottom: 10px; background-color: #e0e5ee;
                }

                .profile-nickname{ font-size: 14px; color: #0d0d0d; margin-bottom: 5px; }

                .profile-photo-btn{
                    input{ display: none; }
                }
            }

            .profile-text{ text-align: left; margin-bottom: 50px;
                h2{ font-size: 16px; font-weight: bold; margin-bottom: 5px; }
                textarea{ width: 100%; height: 100px; font-size: 13px; padding: 10px; }
            }

            .profile-password{ text-align: left; margin-bottom: 50px;
                h2{ font-size: 16px; font-weight: bold; margin-bottom: 5px; }
                > div{
                    margin-bottom: 20px;
                }
                
            }
        }
    }

    
</style>