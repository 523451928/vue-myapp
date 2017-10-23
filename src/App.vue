<template>
  <div id="app">
    <div class="app-nav">
      <router-link v-for="m in menu"  :to="m.path" :key="m.name"  :class="{'router-link-active':$route.path==m.path}">
        <i :class="m.name"></i>{{m.txt}}
      </router-link>
    </div>
    <i class="go-top" @click="goTop" v-show="topShow"></i>
    <div v-show="maskShow" class="mask"></div>
    <transition name="slide-down">
      <player v-show="playerShow"></player>
    </transition>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Player from './components/music/Player.vue'
export default {
  name: 'app',
  data(){
      return {
        menu:[
          {
            name: "reader",
            path:"/reader",
            txt: "读书"
          }, {
            name: "music",
            path:"/music",
            txt: "音乐"
          }, {
            name: "nba",
            path:"/nba",
            txt: "NBA"
          }
          ,{
            name: "movie",
            path:"/movie",
            txt: "电影"
          },
          {
            name: "home",
            path:"/home",
            txt: "首页",
          }
//          ,{
//            name: "read",
//            path:"/read",
//            txt: "读书"
//          }
        ],
        topShow:false
      }
  },
  methods:{
      goTop(){
          document.getElementsByTagName('body')[0].scrollTop=0
      },
      setFontSize(doc, win) {
        var docEl = doc.documentElement,
          isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
          dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
          dpr = window.top === window.self ? dpr : 1, //被iframe引用时，禁止缩放
          resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
        docEl.dataset.dpr = dpr;
        var recalc = function () {
          var width = docEl.clientWidth;
          if (width / dpr > 750) {
            width = 750 * dpr;
          }
          docEl.dataset.width = width;
          docEl.dataset.percent = 100 * (width / 750);
          docEl.style.fontSize = 200 * (width / 750) + 'px';
        };
        recalc();
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
      }
  },
  computed:{
    ...mapState(
        ['maskShow','playerShow']
    )
  },
  watch:{
      $route(val){
        document.getElementsByTagName('body')[0].scrollTop=0
      }
  },
  components:{
    Player
  },
  mounted(){
      var self=this
      this.setFontSize(document,window)
      window.onscroll=function(e){
        if(document.getElementsByTagName('body')[0].scrollTop>1000){
          self.topShow=true
        }else{
          self.topShow=false
        }
      }
  }
}
</script>

<style>
  .swiper .mint-swipe-indicators .mint-swipe-indicator{
    background: #fff;
    opacity: 1;
  }
  .swiper .mint-swipe-indicators .is-active{
    background: #ff6633;
    opacity: 1;
  }
  .mask{
    width: 100%;
    height: 100%;
    position: fixed !important;
    left: 0;
    top: 0;
    background: rgba(0,0,0,0.5);
    z-index: 6;
  }
  .slide-enter-active, .slide-leave-active,.slide-down-enter-active, .slide-down-leave-active,.slide-up-enter-active
  , .slide-up-leave-active,.slide-left-enter-active, .slide-left-leave-active,.slide-right-enter-active, .slide-right-leave-active {
    transition: all .5s
  }
  .slide-right-enter, .slide-right-leave-to {
    transform: translateX(100%);
  }
  .slide-left-enter, .slide-left-leave-to {
    transform: translateX(-100%);
  }
  .slide-enter, .slide-leave-to {
    transform: translateX(100%);
  }
  .fade-enter-active,.fade-leave-active{
    transition: all 0.5s;
  }
  .fade-enter,.slide-leave-to{
    opacity: 0;
  }
  .slide-down-enter , .slide-down-leave-to{
    transform: translateY(100%);
  }
  .slide-up-enter , .slide-up-leave-to{
    transform: translateY(-100%);
  }
  .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
  .clearfix{*+height:1%;}
  .go-top{
    display: inline-block;
    position: fixed;
    width: 0.34rem;
    height: 0.34rem;
    background: url("./assets/img/scroll-to-top-icon.png");
    background-size: contain;
    z-index: 1001;
    bottom: 0.8rem;
    right: 0.14rem;
  }
  a{-webkit-tap-highlight-color:rgba(0,0,0,0);}
  .app-nav{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 0.5rem;
    display: flex;
    border-top: 1px solid #ccc;
    -webkit-box-shadow: 0 0 10px 0 rgba(155,143,143,0.6);
    z-index: 100;
    left: 0;
    background: #fff;
    text-align: center;
  }
  .app-nav a{
    flex-wrap: nowrap;
    width: 25%;
    text-decoration: none;
    color: #666;
    line-height: 0.74rem;
    position: relative;
  }
  .app-nav a i{
    display: inline-block;
    width: 0.24rem;
    height: 0.24rem;
    position: absolute;
    left: 0.25rem;
    top: 0.04rem;
    background: url("./assets/img/home1.png");
    background-size: contain;
  }
  .app-nav a .home{
    background: url("./assets/img/home1.png");
    background-size: contain;
  }
  .app-nav a .reader{
    background: url("./assets/img/read1.png") no-repeat;
    background-size: contain;
  }
  .app-nav a .movie{
    background: url("./assets/img/movie1.png");
    background-size: contain;
  }
  .app-nav a .nba{
    background: url("./assets/img/nba-icon1.png");
    width: 0.22rem;
    height: 0.22rem;
    background-size: contain;
    margin-left: 0.02rem;
  }
  .app-nav a .music{
    width: 0.22rem;
    height: 0.22rem;
    background: url("./assets/img/music1.png");
    background-size: contain;
  }
  .app-nav .router-link-active .home{
    background: url("./assets/img/home.png");
    background-size: contain;
  }
  .app-nav .router-link-active .reader{
    background: url("./assets/img/read.png") no-repeat;
    background-size: contain;
  }
  .app-nav .router-link-active .movie{
    background: url("./assets/img/movie.png");
    background-size: contain;
  }
  .app-nav .router-link-active .nba{
    background: url("./assets/img/nba-icon.png");
    width: 0.22rem;
    height: 0.22rem;
    background-size: contain;
    margin-left: 0.02rem;
  }
  .app-nav .router-link-active .music{
    width: 0.22rem;
    height: 0.22rem;
    background: url("./assets/img/music.png");
    background-size: contain;
  }
  .app-nav .router-link-active{
    color: #ff6633;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
  img[lazy=error] {
    background:url("//y.gtimg.cn/mediastyle/global/img/album_300.png?max_age=31536000");
    background-size: contain;
  }
/**{margin:0; padding:0;user-select: none; font-size: 0.14rem;-webkit-overflow-scrolling: touch !important;}*/

  *{margin:0; padding:0; font-size: 0.14rem;}

  html{overflow-x: hidden;-webkit-tap-highlight-color: rgba(0, 0, 0, 0); }

body{
  width: 100%;
  min-width: 300px;
  max-width: 640px;
  margin: 0 auto;
}
li{
  list-style: none;
}
  .scale-1px{
    position: relative;
    border:none;
  }
  .scale-1px:after{
    content: '';
    position: absolute;
    bottom: 0;
    left:0;
    background: #ccc;
    width: 100%;
    height: 1px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
  }
  .mint-swipe-item, .img-box{
    background: #ccc;
  }

  img[lazy=loading] {
    width: 40px;
    display: block;
    margin:0 auto;
  }
  a{-webkit-tap-highlight-color:rgba(0,0,0,0);}
@media (device-height:568px) and (-webkit-min-device-pixel-ratio:2){/* 兼容iphone5,因为5和4的屏幕宽度一样 */ html{font-size:84px;}}
/*4 4s*/
@media only screen and (device-height :480px) and (-webkit-device-pixel-ratio:2){ html{font-size:84px;}}
@media only screen and (max-device-width :480px){ }
@media only screen and (min-device-width :481px){ }
/*华为*/
@media (min-device-width : 360px) and (max-device-width : 640px) {html{font-size:96px;}}
/*6*/
@media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){ html{font-size:100px;}}
/*ipad*/
@media (min-device-width : 768px) and (max-device-width : 1024px) and (-webkit-min-device-pixel-ratio : 2){ html{font-size:200px;}}
/*s5*/
@media (min-device-width : 360px) and (max-device-width : 640px) and (-webkit-min-device-pixel-ratio : 3){html{font-size:96px;}}

/*6+*/
@media (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 3){ html{font-size:110.4px;}}
@media (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 2){ html{font-size:110.4px;}}
</style>
