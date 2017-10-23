<template>
  <transition name="">
    <div class="read">
      <div class="read-tab">
        <ul>
          <li v-for="(tab,index) in tabArr" @click="changeTab(index)" :class="{'active':index==activeIndex}">{{tab}}</li>
        </ul>
      </div>
      <div class="read-content" >
        <ul :class="{'ul-transition':hasTransition}" :style="`transform:translateX(${translate})`" >
          <li class="read-one clearfix">
            <b-scroll ref="scrollOne" v-if="readObj.t1" :data="readObj.t1">
              <div>
                <div class="clearfix" v-for="(item,index) in readObj.t1" @click="toDetail(item)">
                  <div class="rank">{{index+1}}</div>
                  <div class="detial-content">
                    <h2>{{item.title}}</h2>
                    <p>{{item.summary}}</p>
                  </div>
                </div>
              </div>
            </b-scroll>
          </li>
          <li class="read-two">
              <div>
                <div class="md-card-content clearfix" v-for="(item,index) in readObj.t2">
                  <h2>{{item.title}}</h2>
                  <div v-html="item.content"></div>
                </div>
              </div>
          </li>
          <li class="read-three">
            <div>
              <div class="md-card-content clearfix" v-for="(item,index) in readObj.t3">
                <h2>{{item.title}}</h2>
                <div v-html="item.content"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <v-detail v-if="detailShow" @hideDetail="hideDetail" :detailObj="detailObj"></v-detail>
    </div>
  </transition>
</template>

<script>
  import {getTopicList} from '../api/api'
  import BScroll from '../pubulic/Bscroll.vue'
  import VDetail from './read/Detail.vue'
  import {mapMutations} from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      readObj:{},
      activeIndex:0,
      translate:"0",
      hasTransition:true,
      detailObj:{},
      detailShow:false,
      startPoint:"",
      bodyWidth:"",
      tabArr:[
          '读一区',
          '读二区',
          '读三区'
      ]
    }
  },
  methods:{
    ...mapMutations([
      'setMaskShow'
    ]),
    hideDetail(){
      this.detailShow=false
    },
    toDetail(item){
      this.detailShow=true
      this.detailObj=item
      this.setMaskShow(true)
    },
    changeTab(index){
      this.activeIndex=index
      var as=document.getElementsByTagName('a')
      for(var i=0;i<as.length;i++){
        as[i].onclick=function(e){
          e.stopPropagation()
          e.preventDefault()
        }
      }
      this.translate=-(index*33.333)+"%"
      document.getElementsByTagName('body')[0].scrollTop=0
      if(index!=0){
          for(var i=0; i<document.getElementsByTagName('img').length;i++){
            document.getElementsByTagName('img')[i].style.width="100%"
          }
      }
    },
    startFn(e){
      this.startPoint=e.changedTouches[0].pageX
    },
    moveFn(e){
      if(this.activeIndex==0&&e.changedTouches[0].pageX-this.startPoint>0){
        return
      }else if(this.activeIndex==0&&e.changedTouches[0].pageX-this.startPoint<0){
        this.hasTransition=false
        this.translate=e.changedTouches[0].pageX-this.startPoint+'px'
      }else if(this.activeIndex==1){
        this.hasTransition=false
        this.translate=-this.bodyWidth+e.changedTouches[0].pageX-this.startPoint+'px'
      }else if(this.activeIndex==2&&e.changedTouches[0].pageX-this.startPoint>0){
        this.hasTransition=false
        this.translate=-this.bodyWidth*2+e.changedTouches[0].pageX-this.startPoint+'px'
      }
    },
    endFn(e){
      this.hasTransition=true
      if(this.activeIndex==0&&e.changedTouches[0].pageX-this.startPoint>0){
        return
      }else if(this.activeIndex==0&&e.changedTouches[0].pageX-this.startPoint<0 || this.activeIndex==1&&e.changedTouches[0].pageX-this.startPoint<0){
        this.activeIndex++
        this.translate=-(this.activeIndex*33.3)+"%"
      }else if(this.activeIndex==1&&e.changedTouches[0].pageX-this.startPoint>0 || this.activeIndex==2&&e.changedTouches[0].pageX-this.startPoint>0){
        this.activeIndex--
        this.translate=-(this.activeIndex*33.3)+"%"
      }
    }
  },
  components:{
    BScroll,
    VDetail
  },
  mounted(){
      this.bodyWidth=document.getElementsByTagName('body')[0].clientWidth
    this.$loading('加载中...')
    getTopicList().then((res)=>{
      this.$loading.close()
      this.readObj=res.content
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .md-card-content{
    padding: 0.2rem;
  }
  img{
    width: 90% !important;
    display: none;
  }
  .rank{
    width: 0.28rem;
    height: 0.28rem;
    border-radius: 50%;
    background: #ff6633;
    text-align: center;
    line-height: 0.28rem;
    float: left;
    color: #fff;
    font-size: 12px;
    margin:0.05rem 0.12rem 0 0.14rem;
  }
  .detial-content{
    width: 80%;
    overflow: hidden;
    float: left;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid #ccc;
    margin-top: 0.05rem;
  }
  .detial-content h2{
    font-size: 0.16rem;
  }
  .detial-content p{
    color: #666;
  }
  .read-content{
    width: 100%;
    overflow-x: hidden;
  }
  .ul-transition{
    transition: all .5s;
  }
  .read-content ul{
    width: 300%;
  }
  .read-content ul li{
    float: left;
    width: 33.3%;
    overflow-x: hidden;
    max-height: 5.7rem;
  }
  .read-tab ul{
    display: flex;
    height: 0.5rem;
    line-height: 0.5rem;
  }
  .read-tab li{
    width: 33.3%;
    text-align: center;
    color: #9e9d9d;
  }
  .read-tab .active{
    color: #666;
    border-bottom: 2px solid #ff6633;
  }
</style>
