<template>
  <div class="movie-wrapper" @click="blurFn">
    <div class="search-box" :class="{'search-head':isSearch}">
      <div class="menu" v-show="!isSearch" @click="sideShow=true">
        <i class="iconfont icon-caidan"></i>
      </div>
      <input placeholder="请输入关键字" v-model="query" @click.stop="showSearch" ref="input"/>
      <i class="close" @click="query=''" v-show="query!=''"></i>
      <span v-show="isSearch" @click="hideSearch">取消</span>
    </div>
    <div v-show="!isSearch || query=='' ">
      <div class="top-250 movie-box">
        <h2>豆瓣电影top250 <span @click="getMore('top250')">更多</span></h2>
        <movielist :list="topList"></movielist>
      </div>
      <div class="theaters movie-box">
        <h2>正在上映的电影 <span @click="getMore('in_theaters')">更多</span></h2>
        <movielist :list="theatersList"></movielist>
      </div>
      <div class="theaters movie-box">
        <h2>即将上映的电影 <span @click="getMore('coming_soon')">更多</span></h2>
        <movielist :list="comingList"></movielist>
      </div>
    </div>
    <div class="search-container" v-show="isSearch && query!=''">
      <b-scroll class="movie-list-container" :data="movieList" :pullup="true" @scrollToEnd="scrollToEnd" ref="scroll"  @scroll="scroll" :probeType="3" :listenScroll="true">
        <div>
          <movielist :list="movieList"></movielist>
          <loading v-show="isLoading"></loading>
          <div class="no-more" v-if="noMore">没有更多了</div>
        </div>
      </b-scroll>
      <i class="go-top" @click="goTop" v-show="topShow"></i>
    </div>
    <transition name="fade">
      <div class="mask" v-if="sideShow"  @click="sideShow=false"  @touchmove.stop.prevent ></div>
    </transition>
    <transition name="slide-left">
      <siderbar v-if="sideShow" @closeSide="sideShow=false"></siderbar>
    </transition>
    <router-view></router-view>
  </div>
</template>

<script>
  import Movielist from './movie/Movielist.vue'
  import Siderbar from '../pubulic/Siderbar.vue'
  import BScroll from '../pubulic/Bscroll.vue'
  import Loading from '../pubulic/Loading.vue'
  import Star from '../pubulic/Star.vue'
  import {debounce} from '../assets/js/util'
  import {getMovie,searchMovie} from  '../api/api'

  export default{
    data(){
      return {
        topList:[],
        theatersList:[],
        comingList:[],
        movieList:[],
        movieData:{},
        query:"",
        isSearch:false,
        isLoading:false,
        noMore:false,
        start:0,
        step:0,
        count:12,
        topShow:false,
        sideShow:false
      }
    },
    methods:{
      blurFn(){
        this.$refs.input.blur()
      },
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
      getMore(type){
        this.$router.push({
          path:`/movie/more/?type=${type}`
        })
      },
      showSearch(){
        this.isSearch=true
      },
      hideSearch(){
        this.isSearch=false
        this.query=""
      },
      scrollToEnd(){
        if(this.start>=this.movieData.total){
          this.noMore=true
          return
        }
        this.step++
        this.isLoading=true
        this.start= this.count*this.step
        searchMovie(this.query,this.start,this.count).then((res)=>{
          this.movieList=this.movieList.concat(res.subjects)
          this.isLoading=false
        })
      }
    },
    mounted(){
      this.$watch('query',debounce((newQuery)=>{
        this.start=0
        this.step=0
        this.$loading('加载中...')
        searchMovie(newQuery,this.start,this.count).then((res)=>{
          this.$loading.close()
          this.movieData=res
          this.movieList=res.subjects
        })
      },500))
      this.$loading('加载中...')
      getMovie('top250',9,0).then((res)=>{
        this.topList=res.subjects
      })
      getMovie('in_theaters',9,0).then((res)=>{
        this.theatersList=res.subjects
      })
      getMovie('coming_soon',9,0).then((res)=>{
        this.$loading.close()
        this.comingList=res.subjects
      })
    },
    components:{
      Movielist,
      BScroll,
      Loading,
      Siderbar
    }
  }
</script>

<style >
  .search-box .menu{
    display: inline-block;
    width: 0.4rem;
  }

  .icon-caidan{
    color: #fff;
    margin-left: 0.1rem;
    font-size: 0.16rem;
  }
  .search-container .wrapper{
    max-height:4rem;
  }
  .movie-list-container .items{
    white-space: pre-wrap !important;
  }
  .movie-list-container .row{
    padding-bottom: 0.1rem !important;
  }
  .movie-list-container .star{
    margin-top: -0.1rem !important;
    margin-bottom: 0.1rem !important;
  }
  .movie-list-container .item-title{
    margin: 0 !important;
    margin-top: -0.1rem !important;
  }

  .movie-list-container .item{
    margin-left: .18rem !important;
  }
  .movie-list-container .item:first-child {
    margin-left: .18rem !important;
  }

  .search-box .close{
    width: 0.2rem;
    height: 0.2rem;
    position: absolute;
    display: inline-block;
    background: url("../assets/img/close.png");
    background-size: contain;
    right: 0.66rem;
    top: 0.14rem;
  }
  .movie-box h2{
    padding:0 0.14rem;
    font-weight: normal;
    font-size: 16px;
    line-height: 0.4rem;
    color: #111;
  }
  .movie-box h2 span{
    font-size: 14px;
    color: #ff6633;
    float: right;
  }
  .search-box{
    width: 100%;
    height: 0.5rem;
    background: #ff6633;
    line-height: 0.5rem;
    position: relative;
    z-index: 100;
  }
  .search-box input{
    width:3.1rem;
    height: 0.3rem;
    border: 1px solid #fff;
    border-radius: 0.19rem;
    outline: none;
    text-indent: 0.12rem;

    transition: all .5s;
  }
  .search-box span{
    color: #fff;
    margin-left: 0.1rem;
  }
  .search-head input{
    width: 3rem;
    margin-left: 0.1rem;
  }
  .movie-wrapper{
    color: #666;
    padding-bottom: 0.5rem;
  }
</style>
