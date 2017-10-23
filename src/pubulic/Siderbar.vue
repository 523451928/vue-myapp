<template>
  <div class="sider-bar" @touchstart="startFn" @touchmove="moveFn" @touchend="endFn" ref="siderbar">
    <!--<div class="mask" @click="closeSide"></div>-->
    <div class="container">
      <div class="head">
        <img src="../assets/img/avatar.png">
        <span>coder</span>
      </div>
      <div class="about-project">
        <bscroll :data="aboutList">
          <div>
            <ul>
              <li v-for="(item,index) in aboutList">
                <h2>{{item.title}}:</h2>
                <p v-for="(cont,idx) in item.content">
                  <span v-if="!cont.url"> {{idx+1}}:{{cont.text}}</span>
                  <a :href="cont.url" v-if="cont.url">{{cont.text}}</a>
                </p>
              </li>
            </ul>
          </div>
        </bscroll>
      </div>
    </div>
  </div>
</template>

<script>
  import Bscroll from '../pubulic/Bscroll.vue'
  import {getSlideDirection} from '../assets/js/slideDirection'
  import {prefixStyle} from '../assets/js/dom'
  const transform = prefixStyle('transform')
  export default{
    props:{
      threshold:{
          type:Number,
          default:-70
      }
    },
    data(){
        return{
          aboutList:[
            {
              title:'介绍',
              content:[
                {
                  text:"一款集读书,音乐,NBA,电影,cnode的webapp",
                  url:''
                },
                {
                  text:"因平时会浏览一些网页，然而这些站点没有App；所以为了方便浏览，就把这些站点内容集中到webApp中。",
                  url:''
                },
                {
                  text:"为了更熟练的使用vue,从而利用空闲时间写一个vue的SPA应用",
                  url:''
                },
                {
                  text:"建议在微信里浏览,如有疑问请联系作者 (qq:523451928)",
                  url:''
                }
              ]
            },
            {
              title:'客户端',
              content:[
                {
                  text:"客户端采用流行的Vue构建应用。",
                  url:''
                },
                {
                  text:"技术栈:Vue,Vue-router,Vuex,axios,Jsonp,better-scroll,fastclick,mint-ui,es6,less",
                  url:''
                }
              ]
            },
            {
              title:'心得',
              content:[
                {
                  text:"巩固了vue全家桶的使用。",
                  url:''
                },
                {
                  text:"更加熟练使用移动端rem布局及flex布局",
                  url:''
                },
                {
                  text:"对项目的文件夹分类比之前开发Vue项目合理，清晰",
                  url:''
                },
                {
                  text:"之前在安卓手机上使用会非常卡,后来发现路由也可以懒加载，使用后，使用起来流畅多了",
                  url:''
                }
              ]
            },
            {
              title:'不足',
              content:[
                {
                  text:"由于项目使用的底部导航使用的是fixed布局，及使用了移动端滚动库better-scroll，导致better-scroll包裹的wrapper需要减去下面底部导航的高度。" +
                  "从而导致在不同的机型下滚动的长度不同",
                  url:''
                },
                {
                  text:"开始时使用的是chrome的设备模拟器，没有考虑到微信浏览器的头部高度及其它浏览器的头部，底部高度,导致设置better-scroll的wrapper高度不精确导致滚动到底部时会被下面的导航条遮住",
                  url:''
                },
                {
                  text:"使用fastclick解决移动端点击会延时300ms问题后，发现在nba图片查看组件在真机上使用时双击放大功能会失效",
                  url:''
                }
              ]
            },
            {
              title:'致谢',
              content:[
                {
                  text:"感谢qq音乐，腾讯nba，cnode，豆瓣电影的API接口，如有侵权作者会立即删除网站",
                  url:''
                }
              ]
            },
            {
              title:'github',
              content:[
                {
                  text:"https://github.com/523451928/",
                  url:'https://github.com/523451928/'
                }
              ]
            }
          ],
          touch:{}
        }
    },
    methods:{
      closeSide(){
        this.$emit('closeSide')
      },
      startFn(e){
        this.touch.isStart=true
        this.touch.startX=e.touches[0].clientX
        this.touch.startY=e.touches[0].clientY
        if(this.$refs.siderbar){
          this.$refs.siderbar.style.transition="none"
        }
      },
      moveFn(e){
        if(this.touch.isStart){
          var moveX= e.touches[0].clientX
          var moveY=e.touches[0].clientY
          if(getSlideDirection(this.touch.startX, this.touch.startY,moveX, moveY)==1 || getSlideDirection(this.touch.startX, this.touch.startY,moveX, moveY)==2){
            return false
          }
          this.disX=moveX-this.touch.startX
          if(this.disX>0){
            return
          }
          this.$refs.siderbar.style[transform]=`translate(${this.disX}px,0px)`
        }
      },
      endFn(){
        this.$refs.siderbar.style.transition="all .3s"
        if(this.disX<this.threshold){
          this.$refs.siderbar.style[transform]="translate(-100%,0px)"
          setTimeout(()=>{
            this.$emit('closeSide')
          },10)
        }else{
          this.$refs.siderbar.style[transform]="translate(0px,0px)"
        }
        setTimeout(()=>{
          if(this.$refs.siderbar){
            this.$refs.siderbar.style=''
          }
        },100)
        this.touch.isStart=false
      }
    },
    components:{
      Bscroll
    }
  }
</script>

<style scoped>
  .about-project li{
    margin-bottom: 0.1rem;
  }
  .about-project li a{
    text-decoration: underline;
  }
  .about-project li p{
    line-height: 0.18rem;
    margin-bottom: 0.02rem;
  }
  .about-project li h2{
    color: #111;
    line-height: 0.3rem;
    font-size: 16px;
  }
  .about-project{
    padding: 0.12rem 0.06rem 0.12rem 0.1rem;
  }
  .head{
    height: 0.68rem;
    line-height: 0.68rem;
    /*background: #ff6633;*/
    background: -webkit-linear-gradient(60deg,#737373,#333,#666);
    position: relative;
    z-index: 100;
  }
  .head span{
    color: #fff;
    font-size: 18px;
    position: absolute;
    top:0rem;
    display: inline-block;
  }
  .head img{
    width: .4rem;
    height: .4rem;
    border-radius: 50%;
    margin: 0.14rem 0.1rem 0 0.1rem;
    display: inline;
  }
  .sider-bar{
    position: fixed;
    z-index: 1002;
    left: 0;
    top:0;
    width: 80%;
    height: 100%;
  }
  .mask{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
    background: rgba(0,0,0,0.4);
    z-index: 1;
  }
  .container{
    width: 100%;
    height: 100%;
    position: absolute;
    background: #fff;
    left: 0;
    top: 0;
    z-index: 2;
  }
</style>
