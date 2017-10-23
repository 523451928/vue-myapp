<template>
  <div class="reader">
    <nav class="home-nav">
      <router-link
        class="guide-nav-div"
        v-for="(item,index) in type"
        :to="{path:`reader/${item.num}`}"
        :key="item.num"
      >
        <i class="icon icon-sort"></i>
        <h4 class="guide-nav-h">{{item.word}}</h4>
      </router-link>
    </nav>
    <div v-if="loading">
      <recommend :booklist="booklist | hot" title="热门小说"></recommend>
      <recommend :booklist="booklist | top" title="排行榜"></recommend>
      <recommend :booklist="booklist | free" title="限时免费">
        <span class="day">{{day}}</span><i>:</i><span class="hour">{{hour}}</span><i>:</i><span class="minute">{{minute}}</span><i>:</i><span class="second">{{second}}</span>
      </recommend>
      <book-list :datalist="likes" title="猜你喜欢">
        <span @click="batchFn" class="batch">
         <i class="icon-refresh" ref="icon"></i> 换一批
        </span>
      </book-list>
      <book-list :datalist="booklist | newbook" title="新书抢鲜"></book-list>
      <book-list :datalist="booklist | endbook" title="畅销完本"></book-list>
      <!--<book-list :datalist="booklist | like" title="猜你喜欢">-->
      <span class="recent-read" @click="showRecent">最近阅读</span>
      <transition name="slide-right">
        <recent :recentList="recentList" v-if="recentShow" @hideRecent="recentShow=false" :threshold="80" @removeItem="removeItem" @clearRecent="clearRecent"></recent>
      </transition>
      <transition name="fade">
        <div class="mask" v-if="recentShow"  @click="recentShow=false"  @touchmove.stop.prevent ></div>
      </transition>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getBookList} from '../api/api'
  import Recommend from './reader/Recommend.vue'
  import BookList from './reader/BookList.vue'
  import Recent from './reader/Recent.vue'

  export default{
    data(){
      return {
        recentShow:false,
        booklist: [],
        recentList:[],
        spliceNum:0,
        day:'00',
        hour:'00',
        second:'00',
        minute:'00',
        type: [
          {
            num: 1,
            word: '玄幻'
          },
          {
            num: 2,
            word: '修真'
          },
          {
            num: 3,
            word: '都市'
          },
          {
            num: 4,
            word: '历史'
          },
          {
            num: 5,
            word: '游戏'
          }
        ],
        loading: false,
        refreshNum:0,
        endTime:''
      }
    },
    components:{
      Recommend,
      BookList,
      Recent
    },
    methods:{
      padLeftZero(str){
        return ("00" + str).substr((str + "").length);
      },
      countDown(){
        var nowTime = new Date();
        var t =(this.endTime.getTime()+24*60*60*1000) - nowTime.getTime();
        var d=Math.floor(t/1000/60/60/24);
        var h=Math.floor(t/1000/60/60%24);
        var m=Math.floor(t/1000/60%60);
        var s=Math.floor(t/1000%60);
        this.day=this.padLeftZero(d)
        this.hour=this.padLeftZero(h)
        this.minute=this.padLeftZero(m)
        this.second=this.padLeftZero(s)
      },
      clearRecent(){
        this.recentList=[]
        window.localStorage.setItem('recent_read',JSON.stringify(this.recentList))
      },
      removeItem(index){
          this.recentList.splice(index,1)
          window.localStorage.setItem('recent_read',JSON.stringify(this.recentList))
      },
      showRecent(){
          if(window.localStorage.getItem('recent_read')){
              this.recentList=JSON.parse(window.localStorage.getItem('recent_read'))
          }
          this.recentShow=true
      },
      batchFn(){
        this.refreshNum++
        this.refreshNum=this.refreshNum%4
        this.$refs.icon.style.transform=`rotate(${this.refreshNum*360}deg)`
//        this.$refs.icon.style.transition='all .3s'
//        this.$refs.icon.style.transform="rotate(360deg)"
//        setTimeout(()=>{
//          this.$refs.icon.style.transition='all 0s'
//          this.$refs.icon.style.transform="rotate(0deg)"
//        },300)
        this.spliceNum=Math.ceil(Math.random()*this.booklist.length)-3>0 ? Math.ceil(Math.random()*this.booklist.length)-3 : 0
      }
    },
    computed:{
        likes(){
          return this.booklist.splice(this.spliceNum, 3)
        }
    },
    filters: {
      hot(value) {
        if (!value) return ''
        var arr = []
        value.forEach((item, index) => {
          if (index < 20) {
            if (index % 2 == 1) {
              arr.push(item)
            }
          }
        })
        return arr
      },
      top(value) {
        if (!value) return ''
        var arr = []
        value.forEach((item, index) => {
          if (index < 20) {
            if (index % 2 == 0) {
              arr.push(item)
            }
          }
        })
        return arr
      },
      free(value) {
        if (!value) return ''
        var arr = []
        value.forEach((item, index) => {
          if (index < 20) {
            if (index % 3 == 2) {
              arr.push(item)
            }
          }
        })
        return arr
      },
      newbook(value) {
        if (!value) return ''
        var arr = []
        value.forEach((item, index) => {
          if (index % 3 == 1) {
            arr.push(item)
          }
        })
        return arr.splice(0, 3)
      },
      endbook(value) {
        if (!value) return ''
        var arr = []
        value.forEach((item, index) => {
          if (item.serialize === '完本') {
            arr.push(item)
          }
        })
        return arr
      },
      like(value) {
        if (!value) return ''
        var arr = []
        value.forEach((item, index) => {
          if (index % 4 == 2) {
            arr.push(item)
          }
        })
        return arr.splice(0, 3)
      }
    },
    mounted(){
      this.$loading('加载中...')
      getBookList().then((res) => {
        this.booklist=res
        this.$loading.close()
        this.loading=true
      })
      this.endTime=new Date()
      setInterval(this.countDown,1000)
    }
  }
</script>

<style lang="less" type="text/less">
  .recent-read{
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    position: fixed;
    border-radius: 50%;
    background: #ff4949;
    color: #fff;
    text-align: center;
    padding: 0.06rem;
    font-size: 14px;
    line-height: 1;
    right: 0.12rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    bottom: 1.2rem;
    box-shadow: 0 1px 3px rgba(255, 0, 0, .4);
    z-index: 100;
  }
  .batch{
    font-weight: normal;
    float: right;
    position: relative;
    .icon-refresh{
      display: inline-block;
      width: 0.14rem;
      height: 0.14rem;
      background: url('../assets/img/refresh.png') no-repeat;
      background-size: contain;
      position: relative;
      top: 0.02rem;
      transition: all .3s;
    }
  }
  .reader{
    padding-bottom: 0.5rem;
  }
  a{
    color: #666;
    text-decoration: none;
  }
  .home-nav {
    display: flex;
    padding: 10px 0;
    margin: 10px 0;
    background-color: #fff;
    .guide-nav-div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > i {
        width: 24px;
        height: 24px;
        background-image: url(../assets/images/sprite.0.50.png);
      }
      &:nth-of-type(1) {
        i {
          background-position: -63px -28px;
        }
      }
      &:nth-of-type(2) {
        i {
          background-position: 0 0;
        }
      }
      &:nth-of-type(3) {
        i {
          background-position: 0 -30px;
        }
      }
      &:nth-of-type(4) {
        i {
          background-position: 0 -60px;
        }
      }
      &:nth-of-type(5) {
        i {
          background-position: -30px -30px;
        }
      }
    }
  }

</style>
