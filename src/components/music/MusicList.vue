<template>
    <div class="music-list">
      <div class="back" @click="back">
        <i></i>
      </div>
      <h3 class="list-title" >{{title}}</h3>
      <div class="bg-image" :style="bgStyle" ref="bgImage">
        <div class="filter" ref="filter"></div>
        <div class="random-play" ref="playbtn" @click="playAll">随机播放歌曲</div>
      </div>
      <div class="bg-layer" ref="layer"></div>
      <b-scroll :data="songs" @scroll="scroll"
                :listen-scroll="listenScroll" :probe-type="probeType" class="list" ref="list">
        <div class="song-list-wrapper">
          <songlist :songList="songs" :isRank="isRank"></songlist>
        </div>
      </b-scroll>
    </div>
</template>

<script>
  import BScroll from '../../pubulic/Bscroll.vue'
  import Songlist from './SongList.vue'
  import {prefixStyle} from '../../assets/js/dom'
  import {mapMutations,mapState} from 'vuex'
  const RESERVED_HEIGHT=40
  const transform = prefixStyle('transform')
  const backdrop = prefixStyle('backdrop-filter')
 export default{
   props:[
       'title','songs','bgimg','isRank'
   ],
   data(){
       return{
         scrollY: 0
       }
   },
   computed:{
     ...mapState([
         'musicList'
     ]),
     bgStyle(){
       return `background-image:url(${this.bgimg})`
     }
   },
   methods:{
       ...mapMutations(
           ["setMusiclists","setPlayerShow",'setAutoPlay','setCurrentIndex']
       ),
      playAll(){
        this.setCurrentIndex(parseInt(Math.random()*this.musicList.length))
        this.setPlayerShow(true)
        this.setAutoPlay(true)
        this.setMusiclists(this.songs)
      },
       back(){
           this.$router.back()
       },
       scroll(pos){
         this.scrollY=pos.y
       }
   },
   created(){
     this.probeType = 3
     this.listenScroll = true
   },
   watch:{
       scrollY(newY){
         let translateY = Math.max(this.minTransalteY, newY)
         let scale = 1
         let zIndex = 0
         let blur = 0
         const percent = Math.abs(newY / this.imageHeight)
         if (newY > 0) {
           scale = 1 + percent
           zIndex = 10
         } else {
           blur = Math.min(20, percent * 20)
         }
         this.$refs.layer.style[transform] = `translate3d(0,${translateY}px,0)`
         this.$refs.filter.style[backdrop] = `blur(${blur}px)`
         if (newY < this.minTransalteY) {
           zIndex = 10
           this.$refs.bgImage.style.paddingTop = 0
           this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
           this.$refs.playbtn.style.display='none'
         } else {
           this.$refs.bgImage.style.paddingTop = '70%'
           this.$refs.bgImage.style.height = 0
           this.$refs.playbtn.style.display=''
         }
         this.$refs.bgImage.style[transform] = `scale(${scale})`
         this.$refs.bgImage.style.zIndex = zIndex
       }
   },
   mounted(){
     this.imageHeight = this.$refs.bgImage.clientHeight
     this.minTransalteY = -this.imageHeight + RESERVED_HEIGHT
     this.$refs.list.$el.style.top = `${this.imageHeight}px`
   },
   components:{
     BScroll,
     Songlist
   }
 }
</script>

<style scoped>
  .random-play{
    width: 1.2rem;
    height: 0.24rem;
    text-align: center;
    line-height: 0.24rem;
    position: relative;
    bottom: 0.6rem;
    border-radius: 0.12rem;
    border:1px solid #f5f55f;
    color: #f5f55f;
    margin: 0 auto;
  }
  .list{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #222;
    height: auto;
  }

  .bg-layer{
    position: relative;
    height: 100%;
    background: #222;
  }
  .filter{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7,17,27,.4)
  }
  .bg-image{
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    -webkit-transform-origin: top;
    transform-origin: top;
    background-size: cover;
  }
  .music-list{
    position: fixed;
    height: 100%;
    width: 100%;
    background:#222;
    top:0;
    left: 0;
    z-index: 100;
    color: #fff;
  }
  .back{
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 11;
  }
  .back i{
    width: 0.24rem;
    height: 0.24rem;
    background: url("../../assets/img/return.png");
    background-size: contain;
    display: inline-block;
    margin: 0.08rem 0 0 0.04rem;
  }
  .list-title{
    z-index: 11;
    width: 3rem;
    left: 0.4rem;
    line-height: 0.4rem;
    text-align: center;
    position: absolute;
    font-size: 0.16rem;
    font-weight: normal;
  }
</style>
