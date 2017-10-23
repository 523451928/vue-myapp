<template>
  <div class="circle-wrapper">
      <div class="ciecle-box" v-if="circleList.length>0" ref="circle">
        <h2 class="title">NBA圈子排名</h2>
        <ul>
          <li v-for="(item,index) in circleList">
            <div @click="toCircle(item)">
              <div class="img-box">
                <img v-lazy="item.logo">
              </div>
              <div class="u-title">{{item.name}}</div>
              <div class="u-info">{{item.follow_num | formatNum}}</div>
            </div>
          </li>
        </ul>
      </div>
      <bscroll :data="list" v-if="list.length>0" :listenScroll="true" :probeType="3" :pullup="true" @scrollToEnd="loadMore" @scroll="scroll">
        <div class="list-container">
          <h2 class="title">精选热帖</h2>
          <ul>
            <li v-for="(item,index) in list" class="scale-1px">
              <div class="user">
                <img v-lazy="item.user.logo">
                <span>{{item.publish_time | lastTime }}</span>
                <span class="user-name">{{item.user.name}}</span>
              </div>
              <div class="u-title">{{item.title}}</div>
              <div class="u-img">
                <ul>
                  <li v-if="idx<3" v-for="(img,idx) in item.image_list">
                    <img v-lazy="img.sPicUrl">
                  </li>
                </ul>
              </div>
              <div class="bar clearfix">
                <span class="reply">
                  <i></i> {{item.comment_num}}
                </span>
                <span class="up">
                  <i></i> {{item.like_num}}
                </span>
              </div>
            </li>
            <loading v-if="isLoading"></loading>
          </ul>
        </div>
      </bscroll>
      <router-view></router-view>
  </div>
</template>

<script>
  import {getNbaCircle,getNbaNewList} from '../../api/api'
  import {lastTime} from '../../filters/filters'
  import Bscroll from '../../pubulic/Bscroll.vue'
  import Loading from '../../pubulic/Loading.vue'
  export default{
      data(){
          return {
            list:[],
            circleList:[],
            isLoading:false
          }
      },
      methods:{
        toCircle(item){
          console.log(item)
          this.$router.push({
            path:`/nba/circle/${item.id}`
          })
        },
        loadMore(){
          var lastItem=this.list[this.list.length-1]
          this.isLoading=true
          getNbaNewList(10,lastItem.id,lastItem.publish_time).then((res)=>{
            this.list=this.list.concat(res['community@getNewList'].data.list)
            this.isLoading=false
          })
        },
        scroll(pos){
          if(pos.y<0){
            this.$refs.circle.style.top=Math.max(-175,pos.y)+'px'
          }else{
            this.$refs.circle.style.top='0px'
          }
        }
      },
      filters:{
        formatNum(val){
          return parseFloat(val/10000).toFixed(1)+'万圈友'
        },
        lastTime
      },
      mounted(){
        this.$loading('加载中...')
        getNbaCircle().then((res)=>{
          this.$loading.close()
          this.list=res["community@getHotList"].data.list.concat(res["community@getNewList"].data.list)
          this.circleList=res["community@getSportsCircleList"].data.list
        })
      },
      components:{
        Bscroll,
        Loading
      }
  }
</script>

<style scoped>
  .circle-wrapper{
    width: 100%;
    overflow-x: hidden;
  }
  .circle-wrapper .wrapper{
    max-height: 4rem;
  }
  .up i,.reply i{
    width: 16px;
    height: 16px;
    display: inline-block;
    background: url('../../assets/img/up.png');
    background-size: contain;
    position: relative;
    top: 0.02rem;
  }
  .reply i{
    background: url('../../assets/img/reply.png');
    background-size: contain;
    top: 0.03rem;
  }
  .bar{
    padding: 0.1rem 0;
  }
  .bar span{
    float: right;
    position: relative;
    color: #ccc;
  }
  .bar .up{
    margin-right: 0.1rem;
  }
  .user{
    margin-top: 0.08rem;
    color: #777;
    position: relative;
  }
  .list-container{
    padding:0 0.1rem;
  }
  .ciecle-box{
    padding:0 0.1rem;
    background: #f1f3fa;
    position: relative;
    height: 175px;
  }
  .ciecle-box .title{
    line-height: 0.4rem;
  }
  .user span{
    margin-left: 0.04rem;
    display: inline-block;
    font-size: 12px;
    color: #ccc;
  }
  .user .user-name{
    position: absolute;
    top:0;
    left: 0.34rem;
    color: #666;
    font-size: 14px;
  }
  .u-img{
    width: 100%;
  }
  .u-img ul{
    width: 100%;
    display: flex;
  }
  .u-img li{
    width: 33%;
    margin:0 0.1rem 0 0;
    background: #ccc;
    height: 1.1rem;
  }
  .u-img li img{
    width: 100%;
    height: 100%;
  }
  .u-title{
    display: -webkit-box;
    display: -moz-box;
    display: box;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    box-orient: vertical;
    -webkit-line-clamp: 2;
    -moz-line-clamp: 2;
    line-clamp: 2;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: .16rem;
    line-height: .24rem;
    padding: .12rem 0 0;
  }
  .user img{
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
  }
  .list-container .title{
    line-height: 0.48rem;
  }
  .title{
    font-size: 16px;
    font-weight: normal;
    line-height: 0.3rem;
  }
  .ciecle-box ul{
    display: -webkit-box;
    overflow: scroll;
    text-align: center;
    background: #fff;
    padding-bottom: 0.1rem;
  }
  .ciecle-box .u-title{
    height: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ciecle-box .u-info{
    color: #666;
    font-size: 12px;
  }
  .ciecle-box ul li{
    width: 18%;
    margin-left: 0.12rem;
  }
  .ciecle-box ul :first-child{
    margin-left: 0rem;
  }
  .img-box{
    background: #ccc;
    width: 100%;
  }
  .img-box img{
    width: 100%;
  }
</style>
