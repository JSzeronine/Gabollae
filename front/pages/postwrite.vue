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
                                            <div class="editor-bx">
                                                <div class="editor" @click="removeClick( index )">
                                                    <a class="btn" href="javascript:;">삭제</a>
                                                </div>
                                                <div class="emoticon-bx">
                                                    <img v-if="image.emoticon" :src="`/images/emoticons/${ image.emoticon }`" alt="">

                                                    <div class="agree-check">
                                                        <input type="checkbox" @change="viewChange( index )" :id="`checkbx-id-${ index }`" v-model="image.view">
                                                        <label :for="`checkbx-id-${ index }`">
                                                            <span class="icon-checkbx"></span>
                                                            <span class="text-checkbx">위치 숨기기</span>
                                                        </label>
                                                    </div>

                                                </div>
                                            </div>

                                            <div class="move-bx">
                                                <a class="prev-move btn" @click="prevMove( index )" href="javascript:;">뒤로</a>
                                                <a class="next-move btn" @click="nextMove( index )" href="javascript:;">앞으로</a>
                                            </div>


                                        </div>

                                        <div class="message-bx">
                                            <textarea v-on:input="messageChange( index )" v-model="image.message" name="" id="" cols="30" rows="3"></textarea>
                                        </div>
                                    </div>

                                    <div class="img-view" :style="{ backgroundImage : 'url( http://localhost:3085/' + image.src +  ')'}">
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
                            <input v-model="hashTag" type="text" placeholder="#강릉 #바다 #여행리뷰">
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
                                        <img :src="'/images/emoticons/' + emoticon" alt="">
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="postwrite-complete">
                <div>
                    <a @click="postComplete" class="btn-complete" href="javascript:;">입력 완료</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="@/assets/js/pages/postwrite.js"></script>
<style lang="scss" src="@/assets/scss/pages/postwrite.scss"></style>