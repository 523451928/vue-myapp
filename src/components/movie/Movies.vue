<template>
  <transition name="slide" >
    <div class="movies-wrapper">
      <v-head :msg="titleMsg" @back="back"></v-head>
       <b-scroll class="movie-list-wrapper" :data="movieList" :pullup="true" @scrollToEnd="scrollToEnd">
         <div>
            <movielist :list="movieList"></movielist>
            <loading v-show="isLoading"></loading>
            <div class="no-more" v-if="noMore">没有更多了</div>
         </div>
       </b-scroll>
    </div>
  </transition>
</template>

<script>
  import VHead from '../../pubulic/Head.vue'
  import Loading from '../../pubulic/Loading.vue'
  import Movielist from './Movielist.vue'
  import {getMovie} from '../../api/api'
  import BScroll from '../../pubulic/Bscroll.vue'
  export default{
    data(){
      return {
        titleMsg:"主题",
        movieData:{},
        movieList:[],
        count:15,
        start:0,
        step:0,
        isLoading:false,
        noMore:false
      }
    },
    components:{
      VHead,
      BScroll,
      Movielist,
      Loading
    },
    methods:{
      back(){
        this.$router.go(-1)
      },
      scrollToEnd(){
        if(this.start>=this.movieData.total){
          this.noMore=true
          return
        }
        this.step++
        this.isLoading=true
        this.start= this.count*this.step
        getMovie(this.$router.currentRoute.query.type,this.count,this.start).then((res)=>{
          this.movieList=this.movieList.concat(res.subjects)
          this.isLoading=false
        })
      }
    },
    mounted(){
      this.$loading("加载中...")
      getMovie(this.$router.currentRoute.query.type,this.count,this.start).then((res)=>{
        this.movieData=res
        this.movieList=res.subjects
        this.$loading.close()
      },(res)=>{
        this.$dialog(res)
        this.$loading.close()
      })
      switch (this.$router.currentRoute.query.type){
        case 'top250':
          this.titleMsg="豆瓣电影top250"
          break;
        case 'in_theaters':
          this.titleMsg="正在上映的电影"
          break;
        case 'coming_soon':
          this.titleMsg="即将上映的电影"
          break;
      }
    }
  }
</script>

<style>
  .movies-wrapper .no-more{
    text-align: center;
  }
  .movies-wrapper{
    position: fixed;
    overflow: scroll;
    z-index: 50;
    width: 100%;
    height: 100%;
    background: #fff;
    top:0;
    left: 0;
    z-index: 1000;
  }
  .movies-wrapper .wrapper{
    max-height: 4.8rem;
  }
  .movies-wrapper .row{
    padding-bottom: 0.1rem;
  }
  .movies-wrapper .star{
    margin-top: -0.1rem;
    margin-bottom: 0.1rem;
  }
  .movies-wrapper .item-title{
    margin: 0;
    margin-top: -0.1rem;
  }
  .movie-list-wrapper{
    margin-top: 0.5rem;
  }
  .movies-wrapper .item{
    margin-left: .18rem;
  }
  .movies-wrapper .item:first-child {
    margin-left: .18rem;
  }
  .movies-wrapper .items{
    white-space: pre-wrap;
  }
</style>
