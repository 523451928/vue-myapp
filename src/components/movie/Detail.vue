<template>
  <transition name="slide" >
    <div class="mdetail-wrapper">
      <v-head :msg="movieData.title" @back="back"></v-head>
      <div class="movie-peaple" ref="moviePeaple">
        <h3>影人</h3>
        <div>
          <ul class="row items">
            <li class="item" v-for="(item,index) in peapleList" @click="toCelebrity(item)">
              <div class="item-post">
                <img v-lazy="item.avatars.small" >
              </div>
              <span class="item-name">{{item.name}}</span>
              <p class="item-identity">
                {{index==0?'导演':'演员'}}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <b-scroll :data="scrollData" :listenScroll="true" @scroll="scroll" :probeType="3" :pullup="true" @scrollToEnd="loadMore">
        <div>
          <div class="movie-detail">
            <div class="clearfix detail">
              <div class="left" v-if="movieData.rating">
                <h2>{{movieData.title}} </h2>
                <star :score="movieData.rating.average" :showScore="true" :size="starSize">
                  <i class="ratings-count">{{movieData.ratings_count}}人评价</i>
                </star>
                <p class="meta">
                  {{movieData.genres.join(' / ')}} /
                  <span v-for="(item,index) in movieData.directors">{{item.name}}(导演) / </span>
                  <span v-for="(item,index) in movieData.casts">{{item.name}} / </span>
                  {{movieData.year}}年
                </p>
              </div>
              <div v-if="movieData.images" class="right">
                <img :src="movieData.images.medium">
              </div>
            </div>
            <div class="subject-introduction">
              <h3>{{movieData.title}}的剧情简介</h3>
              <div class="summary">
                {{movieData.summary}}
              </div>
            </div>
            <div class="subject-interests">
              <h3>{{movieData.title}}的短评({{interests.total}})</h3>
              <div class="interests-list">
                <ul>
                  <li v-for="(item,index) in interestList" class="interests-item scale-1px">
                    <div>
                      <div class="desc">
                        <img :src="item.user.avatar">
                        <div class="user-info">
                          <star :score="item.rating.value*2" :showScore="false" :size="starSize">
                            <strong class="name">{{item.user.name}}</strong>
                          </star>
                          <p>{{item.create_time}}</p>
                        </div>
                      </div>
                      <p class="comment">{{item.comment}}</p>
                      <div >
                        <span class="up">
                          <i></i><em>{{item.vote_count}}</em>
                        </span>
                      </div>
                    </div>
                  </li>
                  <loading v-show="loadingShow"></loading>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </b-scroll>
    </div>
  </transition>
</template>

<script>
  import VHead from '../../pubulic/Head.vue'
  import {getMovieDetail,getInterests} from '../../api/api'
  import BScroll from '../../pubulic/Bscroll.vue'
  import Star from '../../pubulic/Star.vue'
  import Loading from '../../pubulic/Loading.vue'
  export default{
    data(){
      return {
        movieData:{},
        starSize:"In",
        interests:{},
        interestList:[],
        count:6,
        start:0,
        step:0,
        loadingShow:false
      }
    },
    computed:{
      peapleList(){
        if(this.movieData.directors){
          return this.movieData.directors.concat(this.movieData.casts)
        }
      },
      scrollData(){
        if(this.peapleList){
          return this.peapleList.concat(this.interestList)
        }
      }
    },
    components:{
      VHead,
      BScroll,
      Star,
      Loading
    },
    methods:{
      scroll(pos){
        if(pos.y>-230){
          this.$refs.moviePeaple.style.top=pos.y+'px'
        }
      },
      loadMore(){
        this.step++
        this.loadingShow=true
        this.start=this.count*this.step
        getInterests(this.$router.currentRoute.params.id,this.count,this.start).then((res)=>{
          console.log(res)
          this.loadingShow=false
          this.interestList=this.interestList.concat(res.interests)
        })
      },
      back(){
        this.$router.go(-1)
      },
      toCelebrity(item){
        this.$router.push({
          path:`/movie/celebrity/?id=${item.id}`
        })
      }
    },
    mounted(){
      this.$loading("加载中...")
      getInterests(this.$router.currentRoute.params.id,this.count,this.start).then((res)=>{
        console.log(res)
        this.interests=res
        this.interestList=res.interests
      })
      getMovieDetail(this.$router.currentRoute.params.id).then((res)=>{
        this.movieData=res
        this.$loading.close()
      },(res)=>{
        this.$dialog.center(res)
        this.$loading.close()
      })
    }
  }
</script>

<style >
  .interests-item .up{
    position: relative;
    top: 0.06rem;
    left: 40px;
  }
  .interests-item .up em{
    position: relative;
    font-style: normal;
    color: #999;
    top: -2px;
  }
  .interests-item .up i{
    width: 16px;
    height: 16px;
    display: inline-block;
    background: url('../../assets/img/up.png');
    background-size: contain;
    margin-right: 0.04rem;
  }
  .interests-item{
    padding: 0.1rem 0 0.16rem 0;
  }
  .user-info .name{
    font-size: 15px;
    display: inline-block;
    vertical-align: text-top;
    margin-right: 6px;
    margin-top: -4px;
  }
  .subject-interests .comment{
    margin-left: 40px;
    font-size: 15px;
    color: #111;
  }
  .subject-interests .desc img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: inline;
  }
  .subject-interests .desc{
    position: relative;
  }
  .subject-interests .desc .user-info{
    margin-left: 42px;
    position: absolute;
    top:0;
  }
  .subject-interests .desc .user-info p{
    font-size: 12px;
    color: #ccc;
    margin-top: 0.06rem;
  }
  .subject-interests{
    margin-top: 0.1rem;
    padding: 0 0.1rem;
  }
  .mdetail-wrapper .wrapper{
    max-height: 2rem;
  }
  .item-identity{
    color:#ccc;
  }
  .item-name{
    font-size: 0.14rem;
    color: #666;
    display: block;
    height: 0.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .movie-peaple .items{
    white-space: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  .movie-peaple .item-post{
    width: 100%;
    min-height: 1.3rem;
    background: #f5f5f5;
  }
  .movie-peaple .item-post img{
    width: 100%;
  }
  .movie-peaple{
    margin-top: 0.5rem;
    position: relative;
    height: 230px;
  }
  .movie-peaple .row {
    border-bottom: 1px solid #F2F2F2;
    padding: 10px 0 15px 0;
  }
  .movie-peaple .item {
    display: inline-block;
    vertical-align: top;
    width: 100px;
    text-align: center;
    margin-left: 0.1rem;
  }
  .subject-interests h3,.subject-introduction h3,.movie-peaple h3{
    margin: 0.1rem 0;
    font-weight: normal;
    font-size: 14px;
    color: #aaa;
  }
  .movie-peaple h3{
    padding: 0 0.1rem;
    margin-top: 0.2rem;
    margin-bottom: 0;
  }
  .ratings-count{
    font-style: normal;
    font-size: 15px;
  }
  .movie-detail .left .score{
    font-size: 15px;
    left:-4px;
    top:-1px;
  }
  .movie-detail .typeIn span{
    margin: 0 1px 0 0;
  }
  .movie-detail .left h2{
    font-weight: normal;
    font-size: 22px;
    color: #333;
    margin-top: 0rem;
    margin-bottom: 0.04rem;
  }

  .movie-detail  .detail,.subject-introduction{
    padding: 0 0.1rem;
  }
  .movie-detail .left{
    width: 65%;
    float: left;
  }
  .movie-detail  .right{
    width: 30%;
    float: right;
  }
  .movie-detail .right img{
    margin-top: 0.1rem;
  }
  .movie-detail{
    margin-top: 0.5rem;
  }
  .mdetail-wrapper{
    position: fixed;
    overflow: scroll;
    z-index: 50;
    width: 100%;
    height: 100%;
    background: #fff;
    top:0;
    left: 0;
    z-index: 100;
  }
</style>
