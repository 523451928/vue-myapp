<template>
  <div class="focu-wrapper">
    <bscroll :data="slideArr" :listenScroll="true" @scroll="scroll" ref="scroll" :probeType="3" >
      <div>
        <div class="swiper clearfix ">
          <mt-swipe :auto="100000" :show-indicators="false">
            <mt-swipe-item v-for="item in slideArr" :key="item.coverImage">
              <a class="item-img" :href="item.url">
                <img v-lazy="item.coverImage">
              </a>
              <p>{{item.title}}</p>
            </mt-swipe-item>
          </mt-swipe>
        </div>
        <div>
          <ul>
            <li v-for="(item,index) in quickList">
              <a :href="`https://quan.qq.com/post?circleid=${item.circleId}&postid=${item.postId}`">
                <div class="info-item scale-1px">
                  <div class="img-box">
                    <img :key="item.coverImage"  v-lazy="item.coverImage"  onerror="this.src='//y.gtimg.cn/mediastyle/yqq/extra/player_cover.png?max_age=31536000';this.onerror=null;">
                  </div>
                  <div class="text-box">
                    <p>{{item.title}}</p>
                    <span :class="{'top':item.mark=='头条'}">{{item.mark}}</span>
                  </div>
                </div>
              </a>
            </li>
            <li v-for="(item,index) in topList">
              <a :href="`https://quan.qq.com/post?circleid=${item.circleId}&postid=${item.postId}`">
                <div class="info-item scale-1px">
                  <div class="img-box">
                    <img :key="item.coverImage"  v-lazy="item.coverImage">
                  </div>
                  <div class="text-box">
                    <p>{{item.title}}</p>
                    <span class="play-count">播放:{{item.playCount}}</span>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </bscroll>
    <i class="go-top" @click="goTop" v-show="topShow"></i>
  </div>
</template>

<script>
  import axios from 'axios'
  import {getNbaFocus} from '../../api/api'
  import Bscroll from "../../pubulic/Bscroll.vue"
  export default{
    data(){
      return {
        focusObj:{},
        slideArr:[],
        quickList:[],
        topList:[],
        topShow:false
      }
    },
    methods:{
      goTop(){
        this.$refs.scroll.scrollTo(0,0,'500')
      },
      scroll(pos){
        if(pos.y<-1000){
          this.topShow=true
        }else{
          this.topShow=false
        }
      }
    },
    mounted(){
      this.$loading('加载中...')
      getNbaFocus().then((res)=>{
        this.focusObj=res.index_basic_new.data
        this.$loading.close()
        this.slideArr=this.focusObj.foucsImageList
        this.quickList=this.focusObj.quickList
        this.topList=this.focusObj.topList
      })
    },
    components:{
      Bscroll
    }
  }
</script>

<style scoped>
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
    text-align: center;
    background: rgba(0,0,0,0.4);
    color: #fff;
    width: 100%;
    line-height: 0.34rem;
    height: 0.34rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .info-item{
    display: flex;
  }
  .img-box{
    height: 0.72rem;
    width: 1.28rem;
    margin: 0.1rem 0.1rem 0.18rem 0.1rem;
  }
  .text-box{
    width: 2.2rem;
    position: relative;
  }
  .text-box span{
    position: absolute;
    bottom: 0.14rem;
    color: #ff6633;
  }
  .text-box .play-count{
    color: #999;
    font-size: 12px;
  }
  .text-box .top{
    color: #ef4f4f;
  }
  .text-box p{
    margin-top: 0.08rem;
  }
  .img-box img{
    width: 100%;
    height: 100%;
  }
  .swiper{
    height: 1.9rem;
    border-bottom: 1px solid #ccc;
  }
  .swiper img{
    width: 100%;
  }
  a{
    text-decoration: none;
    color: #666;
  }
</style>
