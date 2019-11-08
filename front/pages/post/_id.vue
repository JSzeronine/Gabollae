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
                                    </div>

                                    <div class="img-view" :style="{ backgroundImage : 'url(' + image.src + ')'}"></div>
                                </div>
                            </div>
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                </div>

                <div class="map-content">
                    <div class="map-container">
                        <GmapMap class="gmap-container" ref="mapRef" :center="mapCenter" :zoom="15" style="width:100%; height:690px"></GmapMap>
                    </div>
                </div>

            </div>

            <div class="post-content">
                <div class="post-write-bx">
                    <div class="post-title">
                        <p>{{ title }}</p>
                    </div>

                    <div>
                        <a class="btn" href="javascript:;">
                            가볼래
                            <span>9999+</span>
                        </a>
                    </div>

                    <div class="post-description">
                        <p v-html="description"></p>
                    </div>

                    <div class="hash-tag-bx">
                        <ul>
                            <li v-for="( tag, index ) in hashtags" :key="index">
                                <a href="javascript:;">
                                    {{ `#${ tag.value }` }}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <Comment />
                </div>

                <div class="post-user-bx">
                    <div class="profile-bx">
                        <Profile />
                    </div>
                    
                    <div class="new-list">
                        <h3>다른 여행~!</h3>
                        <ul>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                            <li><PostList /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="@/assets/js/pages/post.js"></script>
<style lang="scss" src="@/assets/scss/pages/post.scss"></style>