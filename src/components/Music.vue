<template>
  <div class="music" @click="blurFn">
    <div :class="{'search-head':isSearch}" class="music-head">
      <input  @click.stop="showSearch" placeholder="搜索音乐" v-model="query" ref="input"/>
      <i class="close" @click="query=''" v-show="query!=''"></i>
      <span v-show="!isSearch" class="play-icon" @click="showPlayer" >
        <img v-if="!playing" src="../assets/img/play-btn.png">
        <img v-if="playing" src="../assets/img/wave.gif">
      </span>
      <span v-show="isSearch" @click="hideSearch">取消</span>
    </div>
    <div v-show="isResult">
      <searchlist :resultArr="searchList" @searchMore="searchMore" :query="query" :historyArr="historyArr" @updateHistory="updateHistory">
        <loading v-show="isLoading"></loading>
        <div v-show="noMore" class="no-more">我是有底线的人</div>
        <div v-show="searchList.length==0" class="no-more">抱歉,无搜索结果!</div>
      </searchlist>
    </div>
    <div class="search-wrapper" v-show="isSearch && !isResult">
      <b-scroll :data="historyArr">
        <div>
          <div class="hot-key">
            <div class="hot-title">
              热门搜索
              <span class="change-hot" @click="changeHot">换一批</span>
            </div>
            <div class="hot-box clearfix" >
              <span :key="hot.k" v-for="hot in randomHot" @click="query=hot.k">{{hot.k}}</span>
            </div>
          </div>
          <div class="history-wrapper">
            <div class="history-head">
              最近搜索
              <span class="change-hot" @click="delHistory" v-show="historyArr.length>0"><i></i></span>
            </div>
            <div class="no-history" v-if="historyArr.length==0">暂无最近搜索记录!</div>
            <ul>
              <li v-for="(item,index) in historyArr">
                <p @click="query=item">{{item}}</p>
                <i class="remove" @click.stop="removeItem(index)"></i>
              </li>
            </ul>

          </div>
        </div>
      </b-scroll>
    </div>
    <confirm v-if="confirmShow" :title="confirmTitle" @cancelFn="cancelFn" @confirmFn="confirmFn"></confirm>
    <b-scroll :data="topList">
      <div v-show="!isSearch">
        <div class="swiper clearfix">
          <mt-swipe :auto="10000">
            <mt-swipe-item v-for="item in slideArr":key="item.picUrl">
              <img  v-lazy="item.picUrl">
            </mt-swipe-item>
          </mt-swipe>

          <!--<swiper :imglist="slideArr" :isLoop="true" :duration="6000" :autoPlay="true" :distance="100" ></swiper>-->
        </div>
        <div class="top-list">
          <div class="top-item" v-for="(item,index) in topList" @click="toList(item)">
            <img v-lazy="item.picUrl">
            <i class="listen-count">{{item.listenCount | formatListen}}</i>
            <ul>
              <li v-for="(song,index) in item.songList">
                {{index+1}} {{song.songname}} {{song.singername}}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </b-scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getRecommend,getHotKey,search,getTopList} from '../api/api'
  import {mapState,mapMutations} from 'vuex'
  import {createSong} from '../assets/js/song'
  import {debounce} from '../assets/js/util'
  import BScroll from '../pubulic/Bscroll.vue'
  import Searchlist from './music/Searchlist.vue'
  import Loading from '../pubulic/Loading.vue'
  import Player from './music/Player.vue'
  import Confirm from '../pubulic/Confirm.vue'
  import Swiper from '../pubulic/Swiper.vue'
export default {
  name: 'music',
  data () {
    return {
      slideArr:[],
      hotArr:[],
      topList:[],
      hotSlice:0,
      hotEnd:10,
      query:"",
      isResult:false,
      isSearch:false,
      page:1,
      searchList:[],
      totalnum:0,
      noMore:false,
      isLoading:false,
      historyArr:[],
      confirmTitle:"确认删除历史记录吗?",
      confirmShow:false
    }
  },
  computed:{
    ...mapState([
      "playerShow","playing"
    ]),
    randomHot(){
        return this.hotArr.slice(this.hotSlice,this.hotEnd)
    }
  },
  methods:{
    ...mapMutations([
      "setPlayerShow","setAutoPlay"
    ]),
    blurFn(){
      this.$refs.input.blur()
    },
    updateHistory(arr){

    },
    removeItem(index){
      this.historyArr.splice(index,1)
      window.localStorage.setItem("historyQuery",JSON.stringify(this.historyArr))
    },
    delHistory(){
      this.confirmShow=true
    },
    cancelFn(){
      this.confirmShow=false
    },
    confirmFn(){
      this.historyArr=[]
      this.confirmShow=false
      window.localStorage.setItem("historyQuery","")
    },
    showPlayer(){
      this.setPlayerShow(true)
    },
    searchMore(){
      if(!this.noMore){
        this.isLoading=true
        search(this.query, this.page++, true, 20).then((res) => {
          var ret=[]
          res.data.song.list.forEach((item)=>{
            ret.push(createSong(item))
          })
          this.searchList=this.searchList.concat(ret)
          this.isLoading=false
          if((this.page-1)*20>this.totalnum){
            this.noMore=true
          }
        })
      }
    },
    showSearch(){
      this.isSearch=true
    },
    hideSearch(){
      this.isSearch=false
      this.query=''
    },
    toList(item){
      this.$router.push({
        path:"/music/rank",
        query:{'rank':item.id}
      })
    },
    changeHot(){
        switch (this.hotSlice){
          case 0:
              this.hotSlice=10;
              this.hotEnd=20;
              break;
          case 10:
            this.hotSlice=20;
            this.hotEnd=30;
            break;
          case 20:
            this.hotSlice=0;
            this.hotEnd=10;
            break;
        }
    }
  },
  components:{
    BScroll,
    Searchlist,
    Loading,
    Confirm,
    Swiper
  },
  filters:{
    formatListen(val){
       if(val>10000){
           return parseInt(val/10000)+'万'
       }
    }
  },
  mounted(){
    getRecommend().then((res)=>{
      this.slideArr=res.data.slider
    })
    this.$loading('加载中...')
    getTopList().then((res)=>{
      this.topList=res.data.topList
      this.$loading.close()
    })
    getHotKey().then((res)=>{
      this.hotArr=res.data.hotkey
    })
    if(window.localStorage.getItem("historyQuery")!=null&&window.localStorage.getItem("historyQuery")!=""){
        this.historyArr=JSON.parse(window.localStorage.getItem("historyQuery"))
    }
    this.$watch('query', debounce((newQuery) => {
      this.page=1
      this.isLoading=true
      this.$loading("加载中...")
      search(newQuery, this.page, true, 20).then((res) => {
          if(newQuery!=''){
            this.isResult=true
          }else{
            this.isResult=false
          }
          this.$loading.close()
          var ret=[]
          this.totalnum=res.data.song.totalnum
          if(res.data.zhida.type==2){
            ret.push(res.data.zhida)
          }
          res.data.song.list.forEach((item)=>{
            ret.push(createSong(item))
          })
          this.isLoading=false
          this.searchList=ret
      })
    }, 500))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .listen-count{
    position: absolute;
    font-style: normal;
    font-size: 12px;
    color: #fff;
    bottom: 0.02rem;
    left: 0.12rem;
    padding-left: 0.16rem;
    background: url("../assets/img/listen.png") 3px 0px no-repeat;
    background-size: 14px;
  }
  .history-wrapper li .remove{
    position: absolute;
    right: 0.2rem;
    top: 0.06rem;
    width: 18px;
    height: 18px;
    display: inline-block;
    background: url("../assets/img/history-remove.png");
    background-size: cover;
  }
  .no-history{
    text-align: center;
    color: #ccc;
    margin-top: 0.1rem;
  }
  .change-hot i{
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url("../assets/img/del.png");
    background-size: cover;
    margin-top: 0.08rem;
  }
  .history-head{
    margin-top: 0.1rem;
  }
  .history-wrapper li{
    position: relative;
    color: #fff;
    padding-left: 0.18rem;
    line-height: 0.34rem;
    font-size: 0.15rem;
    color: #f5f5f5;
  }
  .hot-key{
    padding-top: 0.2rem;
  }
  .no-more{
    color: #fff;
    text-align: center;
    border-top: 1px dotted #f5f5f5;
  }
  .music-head .close{
    width: 0.2rem;
    height: 0.2rem;
    position: absolute;
    display: inline-block;
    background: url("../assets/img/close.png");
    background-size: contain;
    right: 0.56rem;
    top: 0.14rem;
  }
  .top-item{
    display: flex;
    padding: 0 0.12rem;
    position: relative;
    margin-top: 0.1rem;
  }
  .top-item img{
    width: 0.9rem;
    height: 0.9rem;
  }
  .top-item ul{
    width: 2.6rem;
    background: #f5f5f5;
  }
  .top-item ul li{
    max-width: 2.6rem;
    margin-left: 0.08rem;
    font-size: 0.13rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    line-height: 0.3rem;
  }

  .change-hot {
    float: right;
    margin-right: 0.2rem;
    color: #fff;
    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#fff), to(#ccc));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

  }
  .hot-box{
    padding-left: 0.2rem;
    margin-top: 0.1rem;
  }
  .hot-box span{
    display: inline-block;
    padding: 0.01rem 0.04rem;
    border-radius: 2px;
    border: 1px solid #fff;
    color: #fff;
    margin-right: 0.1rem;
    margin-bottom: 0.08rem;
    font-family: -webkit-body;
  }
  .hot-title,.history-head{
    text-indent: 0.18rem;
    height: 0.34rem;
    line-height: 0.34rem;
    border-bottom: 1px solid #fff;
    color: #ccc;
  }
  .search-wrapper{
    background: -webkit-linear-gradient(60deg,#737373,#333,#666);
    min-height: 5.7rem;
  }
  .music-head{
    width: 100%;
    height: 0.5rem;
    background: #ff6633;
    line-height: 0.5rem;
    position: relative;
    z-index: 100;
  }
  .search-head{
    background: -webkit-linear-gradient(30deg,#737373,#333,#666);
  }
  .music-head span{
    color: #fff;
  }
  .play-icon{
    width: 0.28rem;
    height: .22rem;
    display: inline-block;
    margin: 0rem 0 0 0.2rem;
    top: 0.01rem;
    position: relative;
  }
  .play-icon img{
    height: 0.2rem;
    width: 0.2rem;
  }
  .music-head input{
    width:2.9rem;
    height: 0.3rem;
    border: 1px solid #fff;
    border-radius: 0.19rem;
    outline: none;
    text-indent: 0.12rem;
    margin-left: 0.18rem;
    transition: all .5s;
  }
  .search-head input{
    width: 3.1rem;
  }
  .swiper{
    height: 1.5rem;
  }
  .swiper img{
    width: 100%;
  }

</style>
