<template>
  <div class="video-wrapper">
    <bscroll v-if="videoData.hottagList" :data="videoData.operationIndex" >
      <div>
        <div class="swiper clearfix ">
          <mt-swipe :auto="10000" :show-indicators="false">
            <mt-swipe-item v-for="(item,index) in videoData.operationIndex" :key="item.pic">
              <a class="item-img" :href="item.linkurl">
                <img v-lazy="item.pic">
              </a>
              <p>{{item.subtitle}}</p>
              <span class="dot-pointer">{{index+1}} / {{videoData.operationIndex.length}}</span>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div class="hot-tag">
          <h2 class="title">独家视角<strong>精选热门内容</strong></h2>
          <div class="list-img">
            <bscroll v-if="videoData.hottagList" :data="videoData.hottagList" :scrollX="true">
              <ul>
                <li v-for="(item,index) in videoData.hottagList">
                  <div class="u-img">
                    <img :src="item.picUrl">
                    <p>{{item.tagname}}</p>
                  </div>
                </li>
              </ul>
            </bscroll>
          </div>
        </div>
        <div class="video-list" v-for="(item,index) in videoData.videolist">
          <h2 class="title">{{item.title}}</h2>
          <div class="video-container">
            <ul>
              <li v-for="(video,index) in item.list">
                <a :href="video.omgurl">
                  <div class="img-box">
                    <div>
                      <img v-lazy="video.picUrl">
                    </div>
                    <i class="play-icon"></i>
                    <span class="play-count">{{video.playcnt}}观看</span>
                    <p>{{video.title}}</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </bscroll>
  </div>
</template>

<script>
  import {getNbaVideo} from '../../api/api'
  import Bscroll from '../../pubulic/Bscroll.vue'
  export default{
    data(){
      return {
        eventPassthrough:"horizontal",
        videoData:{}
      }
    },
    mounted(){
      getNbaVideo().then((res)=>{
        this.videoData=res["video@getIndexData"].data
      })
    },
    components:{
      Bscroll
    }
  }
</script>

<style scoped>
  .video-wrapper{
    width: 100%;
    overflow-x: hidden;
  }
  a{text-decoration: none; color: #333}
  .hot-tag .wrapper{
    margin-bottom: 0;
  }
  .video-list{
    padding: 0.12rem;
    padding-right: 0;
  }
  .video-container ul{
    display: -webkit-flex;
    flex-wrap:wrap;
    padding: 0;
    width: 100%;
  }
  .video-container ul li{
    width: 50%;
  }
  .video-container .img-box{
    padding:0.1rem 0rem;
    margin-right: 0.12rem;
    position: relative;
    background: #fff;
  }
  .video-container .img-box div{
    background: ;
  }
  .img-box p{
    height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .img-box .play-icon{
    width: 0.3rem;
    height: 0.3rem;
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-120%);
    background: url("https://3gimg.qq.com/wap30/infoapp/touch/nba_new/images/icon-play2.png");
    background-size: cover;
  }
  .img-box .play-count{
    position: absolute;
    display: inline-block;
    background: rgba(0,0,0,0.4);
    font-size: 12px;
    line-height: 0.2rem;
    padding: 0 0.1rem;
    color: #fff;
    bottom: 0.52rem;
    right: 0;
  }
  .video-container ul li img{
    width: 100%;
    max-height: 0.96rem;
  }
  .hot-tag{
    padding: 0.12rem;
    padding-top: 0;
    background: #fff;
  }
  .list-img{
    overflow: hidden;
  }
  .list-img ul{
    display: -webkit-box;
    overflow-x: auto;
    width: 7.2rem;
    display: flex;
  }
  .list-img ul li{
    -webkit-box-flex: initial;
    width: 1.38rem;
    background: #fff;
    margin-right: 0.1rem;
    margin-bottom: .08rem;
  }
  .u-img{
    overflow: hidden;
    position: relative;
    height: .77rem;
  }
  .u-img p{
    width: 100%;
    height: 0.26rem;
    line-height: 0.26rem;
    background: rgba(0,0,0,0.4);
    color: #fff;
    bottom: 0;
    position: absolute;
  }
  .u-img img{
    height: 100%;
  }
  .hot-tag .title{
    margin-bottom: .1rem;
  }
  .title{
    line-height: 0.4rem;
    background: #f1f3fa;
    font-size: 18px;
    font-weight: normal;
    width: 120%;
    margin-left: -10%;
    text-indent: 0.38rem;
  }
  .title strong{
    font-size: 12px;
    margin-left: 0.05rem;
    font-weight: normal;
  }
  .dot-pointer{
    position: absolute;
    bottom: 0.06rem;
    right: 0.1rem;
    color: #fff;
    font-size: 16px;
  }
  .swiper{
    height: 1.9rem;
    border-bottom: 1px solid #ccc;
  }
  .swiper img{
    width: 100%;
  }
  .item-img{
    background: #ccc;
  }
  .item-img img[lazy=loading] {
    width: 40px;
    height: 2rem;
    display: block;
    margin:0 auto;
  }
  .mint-swipe-item p{
    position: absolute;
    bottom:0;
    text-align: left;
    font-size: 16px;
    background: rgba(0,0,0,0.4);
    padding: 0.06rem 3%;
    color: #fff;
    width: 94%;
    line-height: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
