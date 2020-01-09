<template>
    <div class="post">
        <div class="post-bx">
            <div class="post-img-map-content">
                <div class="img-content">
                    <div class="img-container">
                        <div class="img-content-title">{{ post.title }}</div>
                        <div ref="uploadImgSwiper" v-swiper:postSwiper="postSwiperOption" @slideChange="onSlide">
                            <div ref="imgContainer" class="swiper-wrapper">
                                <div class="swiper-slide image-view-list" @click="swiperSlideClick( index )" v-for="( image, index ) in post.Images" :key="index" :style="{ width:image.w + 'px' }">
                                    <div class="image-view-list-content">
                                        <div class="info-bx">
                                            <div class="option-bx" v-if="image.view">
                                                <img v-if="image.emoticon" :src="`/images/emoticons/${ image.emoticon }`" alt="">
                                            </div>
                                        </div>
                                        <div class="img-view" :style="{ backgroundImage : `url( ${ getResourceURL }${ image.src } )`}"></div>
                                    </div>
                                    <div class="shadow">
                                        <img src="/images/common/shadow.png" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-pagination" slot="pagination"></div>
                            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
                            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                        </div>
                    </div>
                </div>

                <div class="map-content">
                    <div class="map-container">
                        <GmapMap class="gmap-container" ref="mapRef" :center="mapCenter" :zoom="17" style="width:100%; height:720px"></GmapMap>
                    </div>
                </div>

            </div>

            <div class="post-content">
                <div class="post-write-bx">
                    <div class="post-info-bx">

                        <div class="post-title">
                            <p class="post-title-content">{{ post.title }}</p>
                            <div class="post-action">
                                <span class="date">{{ $moment( post.createdAt ).fromNow() }}</span>
                            </div>
                        </div>

                        <div class="hash-tag-bx">
                            <ul>
                                <li v-for="( tag, index ) in post.Hashtags" :key="index">
                                    <router-link :to="`/hashtag/${ tag.content }`">
                                        {{ `#${ tag.content }` }}
                                    </router-link>
                                </li>
                            </ul>
                        </div>

                        <div class="like-bx">
                            <a class="btn" @click="clickLike" href="javascript:;">
                                {{ likeText }} {{ getTotalLikes }}
                            </a>

                            <a v-if="me && me.id !== other.id" class="btn" @click="clickShare" href="javascript:;">
                                {{ share }} {{ getTotalShare }}
                            </a>
                        </div>
                    </div>

                    <div class="profile-bx">
                        <Profile />
                    </div>

                    <div class="post-description">
                        <p v-html="post.content.replace(/(\n|\r\n)/g, '<br>')"></p>
                    </div>

                    <Comment />
                </div>

                <div class="post-user-bx">
                    <div class="new-list">
                        <h3>{{ other.nickname }} 님의 다른 여행 &#128151</h3>
                        <ul>
                            <li v-for="( item, index ) in list" :key="index">
                                <PostList v-if="item.id !== post.id" :info="item" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="@/assets/js/pages/post.js"></script>
<style lang="scss" src="@/assets/scss/pages/post.scss"></style>