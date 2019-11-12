<template>
    <div class="postwrite">
        <div class="postwrite-bx">
            <div class="postwrite-img-map-content">
                <div class="img-content">
                    <div class="img-container">
                        <div ref="uploadImgSwiper" v-swiper:postwriteSwiper="postwriteSwiperOption" @slideChange="onSlide">
                            <div ref="imgContainer" class="swiper-wrapper">
                                <div class="swiper-slide image-view-list" v-for="( image, index ) in images" :key="index" :style="{ width:image.w + 'px' }">
                                    <div class="info-bx">
                                        <div class="option-bx">
                                            <div class="editor" @click="removeClick( index )">
                                                <a class="btn" href="javascript:;">삭제</a>
                                            </div>
                                            <div class="emoticon-bx">
                                                <img v-if="image.emoticon" :src="image.emoticon" alt="">
                                            </div>
                                        </div>

                                        <div class="message-bx">
                                            <textarea v-on:input="messageChange( index )" v-model="image.message" name="" id="" cols="30" rows="3"></textarea>
                                            <!-- <input v-model="image.message" type="text" placeholder="말풍선 메세지 한줄 남기기"> -->
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

                    <div class="postwrite-write-bx">
                        <div class="postwrite-title">
                            <input type="text" v-model="title" placeholder="제목을 입력해주세요.">
                        </div>

                        <div class="postwrite-description">
                            <textarea v-model="content" name="" id="" cols="30" rows="10">내용을 입력해주세요.</textarea>
                        </div>

                        <div class="hash-tag-bx">
                            <input type="text" v-model="hashTag" placeholder="#강릉 #바다 #여행리뷰">
                        </div>
                    </div>
                </div>

                <div class="map-content">
                    <div class="map-container">
                        <GmapMap class="gmap-container" ref="mapRef" :center="mapCenter" :zoom="15" style="width:100%; height:690px">
                            <!-- <gmap-polyline v-bind:path.sync="markers" v-bind:options="{ strokeColor:'rgba( 0, 0, 0, 1 )', strokeWidth : '0.1' }"></gmap-polyline> -->
                        </GmapMap>
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
            </div>

            <div class="postwrite-complete">
                <div>
                    <a class="btn-complete" href="javascript:;" @click="modificationClick">수정 완료</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="@/assets/js/pages/modification.js"></script>
<style lang="scss" src="@/assets/scss/pages/modification.scss"></style>