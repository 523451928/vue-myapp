<template>
  <div class="image-wrapper">
    <bscroll :data="imgList" :pullup="true" @scrollToEnd="loadMore"  ref="scroll"  @scroll="scroll" :probeType="3" :listenScroll="true">
      <div class="img-box">
        <div class="img-item" v-for="(item,index) in imgList" @click="toDetail(item)">
          <img :key="item.coverImage"  v-lazy="item.coverImage">
          <p>{{item.title}}</p>
        </div>
        <loading v-if="loadShow"></loading>
      </div>
    </bscroll>
    <i class="go-top" @click="goTop" v-show="topShow"></i>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getNbaImg} from '../../api/api'
  import Bscroll from "../../pubulic/Bscroll.vue"
  import Loading from "../../pubulic/Loading.vue"
  export default{
    data(){
      return {
        pageId:1,
        imgList:[],
        hasNext:true,
        loadShow:false,
        topShow:false
      }
    },
    methods:{
      goTop(){
        this.$refs.scroll.scrollTo(0,0,'500')
      },
      scroll(pos){
        if(pos.y<-300){
          this.topShow=true
        }else{
          this.topShow=false
        }
      },
      toDetail(item){
        this.topShow=false
        this.$router.push({
          path:`/nba/image/${item.newsId}`
        })
      },
      loadMore(){
        if(this.hasNext){
          this.loadShow=true
          this.pageId++
          this.getData(true)
        }
      },
      getData(flag){
        getNbaImg(this.pageId).then((res)=>{
          if(!flag){
            this.imgList=res['pic@getList'].data.list
          }else{
            this.imgList=this.imgList.concat(res['pic@getList'].data.list)
          }
          this.hasNext=res['pic@getList'].data.hasNext
        })
      }
    },
    mounted(){
      this.getData(false)
    },
    components:{
      Bscroll,
      Loading
    }
  }
</script>

<style scoped>
  .image-wrapper .img-box{
    background: #f5f5f5;
  }
  .img-item{
    height: 2rem;
    overflow: hidden;
    display: block;
    position: relative;
    margin-bottom: 0.1rem;
    background: #f5f5f5;
  }
  .img-item img{
    width: 100%;
  }
  .img-item img[lazy=loading] {
    width: 40px;
    height: 2rem;
    display: block;
    margin:0 auto;
  }
  .img-item p{
    width: 100%;
    line-height: 0.34rem;
    text-align: center;
    position: absolute;
    bottom: 0;
    background: rgba(0,0,0,0.4);
    color: #fff;
  }
</style>
