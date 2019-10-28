<template>
    <div class="post">
        <div class="post-bx">
            <div class="post-img-map-content">
                <div class="img-content">
                    <div class="img-container">
                        <div ref="uploadImgSwiper" v-swiper:postSwiper="postSwiperOption" @slideChange="onSlide">
                            <div ref="imgContainer" class="swiper-wrapper">
                                <div class="swiper-slide image-view-list" @click="swiperSlideClick( index )" v-for="( image, index ) in images" :key="index" :style="{ width:image.w + 'px' }">
                                    <div class="info-bx">
                                        <div class="option-bx">
                                            <img v-if="image.emoticon" :src="image.emoticon" alt="">
                                        </div>

                                        <div class="message-bx">
                                            <input v-on:input="messageChange( index )" v-model="image.message" type="text" placeholder="말풍선 메세지 한줄 남기기">
                                        </div>
                                    </div>

                                    <div class="img-view" :style="{ backgroundImage : 'url(' + image.src +  ')'}">
                                        <!-- <img :src="image.src" alt=""> -->
                                    </div>
                                </div>

                                <div class="swiper-slide" :style="{ width:'300px' }">
                                    <div class="upload-bx">
                                        <div class="upload-title">
                                            이미지를 <br />
                                            추가해 주세요.
                                        </div>

                                        <div class="btn-upload-bx">
                                            <a class="btn-upload" href="javascript:;" @click="onImageUpload">+</a>
                                            <input ref="imageInput" type="file" multiple hidden @change="onChangeImages">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="swiper-pagination"></div> -->
                        </div>
                    </div>
                </div>

                <div class="map-content">
                    <div class="map-container">
                        <GmapMap class="gmap-container" ref="mapRef" :center="mapCenter" :zoom="17" style="width:100%; height:690px">
                            <!-- <gmap-polyline v-bind:path.sync="markers" v-bind:options="{ strokeColor:'rgba( 0, 0, 0, 1 )', strokeWidth : '0.1' }"></gmap-polyline> -->
                        </GmapMap>
                    </div>
                </div>
            </div>

            <div class="post-content">
                <div class="post-write-bx">
                    <div class="post-title">
                        <input type="text" v-model="title" placeholder="제목을 입력해주세요.">
                    </div>

                    <div class="post-description">
                        <textarea v-model="description" name="" id="" cols="30" rows="10">내용을 입력해주세요.</textarea>
                    </div>
                </div>

                <div class="map-option">
                    <div class="map-option-emoticon">
                        <div class="map-option__title">
                            <p>이모티콘</p>
                        </div>

                        <ul class="map-option__emoticon">
                            <li class="map-option__emoticon-list" v-for="( emoticon, index ) in emoticons" :key="index">
                                <a href="javascript:;" @click="emoticonClick( index )">
                                    <img :src="emoticon" alt="">
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="post-complete">
                <div>
                    <a class="btn-complete" href="javascript:;">입력 완료</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="@/assets/js/pages/post.js"></script>
<style lang="scss" src="@/assets/scss/pages/post.scss"></style>