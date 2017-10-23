<template>
  <div class="player">
    <v-head @back="hidePlayer" :is-rotate="true" :msg=" currentSong&&currentSong.name || '快去添加歌曲吧'"></v-head>
    <div class="background">
      <img width="100%" height="100%" v-if="currentSong&&currentSong.image" :src="currentSong.image"
           onerror="this.src='//y.gtimg.cn/mediastyle/yqq/extra/player_cover.png?max_age=31536000';this.onerror=null;">
    </div>
    <div class="song-wrapper">
      <h2 class="singer" v-if="currentSong&&currentSong.singer">{{currentSong.singer}}</h2>
      <div class="cd-wrapper" v-if="currentSong">
        <div class="cd play" :class="{'pause':!playing}">
          <img width="100%" height="100%"  :src="currentSong.image"
               onerror="this.src='//y.gtimg.cn/mediastyle/yqq/extra/player_cover.png?max_age=31536000';this.onerror=null;" >
        </div>
      </div>
      <div class="progress-wrapper">
        <span class="time time-l">{{currentTime | formatTime}}</span>
        <div class="progress-bar-wrapper" @click.stop="progressClick">
          <div class="bar-inner" ref="progressBar">
            <div class="progress" :style="progressStyle"  ref="progress"></div>
            <div class="progress-btn-wrapper" :style="dotStyle"
                 @touchstart.prevent="progressTouchStart"
                 @touchmove.prevent="progressTouchMove"
                 @touchend="progressTouchEnd"
                 ref="progressBtn"
            >
              <div class="progress-btn"></div>
            </div>
          </div>
        </div>
        <span class="time time-r" ><i v-if="currentSong && currentSong.duration">{{currentSong.duration | formatTime}}</i> <i v-if="!currentSong">0:00</i></span>
      </div>
      <div class="operators">
        <div class="icon icon-left">
          <i  :class="{'sequence':mod==0,'random':mod==1,'singles':mod==2,'lists':mod==3}" @click="changeMod"></i>
        </div>
        <div class="icon icon-left">
          <i class="play-left" @click="prevSong"></i>
        </div>
        <div class="icon icon-center">
          <i :class="playClass" @click="togglePlay"></i>
        </div>
        <div class="icon icon-right">
          <i class="play-right" @click="nextSong"></i>
        </div>
        <div class="icon icon-right" @click="showList">
          <i class="music-list"></i>
        </div>
      </div>
    </div>
    <transition name="slide-up">
      <message v-show="messageShow" :msg="msg"></message>
    </transition>
    <playlist ref="playlist" :playing="playing" @close="listShow=false" :listShow="listShow" v-show="listShow&&currentSong!=null" :musicList="musicList" :currentIndex="currentIndex"></playlist>
    <audio ref="audio" v-if="currentSong&&currentSong.url" :src="currentSong.url" @play="ready" @error="error" @timeupdate="updateTime"
           @ended="end"></audio>
  </div>
</template>

<script>
  import VHead from '../../pubulic/Head.vue'
  import Playlist from './PlayList.vue'
  import Message from '../../pubulic/Message.vue'
  import {mapMutations,mapState} from 'vuex'
  export default{
    data(){
      return {
        mod:0,      //0 顺序播放（sequential） 1 随机播放（random） 2单曲循环（singles） 3列表循环（lists）
        currentTime:0,
        listShow:false,
        progressStyle:{
          width:'0%'
        },
        dotStyle:{
          left:'-5px'
        },
        messageShow:false,
        msg:"",
        touch:{}
      }
    },
    methods:{
      ...mapMutations([
        'setPlayerShow','setPlaying',"setAutoPlay","setCurrentIndex","setMusiclists"
      ]),
      progressTouchStart(e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth
      },
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - 14, Math.max(0, this.touch.left + deltaX))
        this.offset(offsetWidth)
      },
      progressTouchEnd() {
        this.touch.initiated = false
        this._triggerPercent()
      },
      progressClick(e) {
        const rect = this.$refs.progressBar.getBoundingClientRect()
        const offsetWidth = e.pageX - rect.left
        this.offset(offsetWidth)
        this.$refs.audio.currentTime=offsetWidth/(this.$refs.progressBar.clientWidth - 14)*this.currentSong.duration
      },
      _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - 14
        const percent = this.$refs.progress.clientWidth / barWidth
        this.$refs.audio.currentTime=percent*this.currentSong.duration
      },
      showList(){
        this.listShow=true
        if(this.currentIndex<this.musicList.length-10){
          setTimeout(()=>{
            this.$refs.playlist.scrollTo(this.currentIndex)
          },500)
        }else if(this.musicList.length>10){
          setTimeout(()=>{
            this.$refs.playlist.scrollTo(this.currentIndex-5)
          },500)
        }
      },
      hidePlayer(){
        this.setPlayerShow(false)
      },
      offset(width){
        this.dotStyle={
          left:width-5+'px'
        }
        this.progressStyle={
          width:width+'px'
        }
      },
      changeMod(){
        switch (this.mod){
          case 0:
            this.mod=1
            this.msg="已切换到随机播放模式"
            break;
          case 1:
            this.mod=2
            this.msg="已切换到单曲循环模式"
            break;
          case 2:
            this.mod=3
            this.msg="已切换到列表循环模式"
            break;
          case 3:
            this.mod=0
            this.msg="已切换到顺序播放模式"
            break;
        }
        this.messageShow=true
        if(this.timer){
          clearTimeout(this.timer)
        }
        this.timer= setTimeout(()=>{
          this.messageShow=false
        },2500)
      },
      togglePlay(){
        if(!this.currentSong.url){
          this.$dialog.center('暂无歌曲！',{
            background:'#fff',
            color:'#333'
          })
          return
        }
        this.setAutoPlay(true)
        this.setPlaying(!this.playing)
      },
      prevSong(){
        if(!this.currentSong.url){
          return
        }
        if(this.mod!=1){
          var index=this.currentIndex-1
          if(index<0){
            index=this.musicList.length-1
          }
          this.setCurrentIndex(index)
        }else{
          this.setCurrentIndex(Math.floor(Math.random()*this.musicList.length))
        }
        this.loop()
      },
      nextSong(){
        if(!this.currentSong.url){
          return
        }
        if(this.mod!=1){
          var index=this.currentIndex+1
          if(index>this.musicList.length-1){
            index=0
          }
          this.setCurrentIndex(index)
        }else{
          this.setCurrentIndex(Math.floor(Math.random()*this.musicList.length))
        }
        this.loop()
      },
      ready(){

      },
      end(){
        switch (this.mod){
          case 0:
            this.setCurrentIndex(this.currentIndex+1)
            if(this.currentIndex==this.musicList.length){
              this.setCurrentIndex(this.musicList.length-1)
              this.$refs.audio.currentTime=0
              this.setAutoPlay(false)
              this.setPlaying(false)
            }
            break;
          case 1:
            this.setCurrentIndex(Math.floor(Math.random()*this.musicList.length))
            this.loop()
            break;
          case 2:
            this.setCurrentIndex(this.currentIndex)
            this.loop()
            break;
          case 3:
            if(this.currentIndex==this.musicList.length-1){
              this.setCurrentIndex(0)
            }else{
              this.setCurrentIndex(this.currentIndex+1)
            }
            this.loop()
            break;
        }
      },
      loop(){
        this.$nextTick(()=>{
          var audio= this.$refs.audio
          audio.currentTime=0
          audio.play()
        })
      },
      updateTime(e){
        if(!this.currentSong || !this.currentSong.url){
          return
        }
        this.currentTime = e.target.currentTime|0
      },
      error(){

      }
    },
    computed:{
      ...mapState([
        'musicList','currentIndex','playing','autoPlay'
      ]),
      playClass(){
        return this.playing?'play':''
      },
      currentSong(){
        return this.musicList[this.currentIndex]
      },
      percent(){
        if(this.currentSong){
          return this.currentTime/this.currentSong.duration
        }
      }
    },
    watch:{
      percent(newVal){
        var width=newVal*this.$refs.progressBar.clientWidth|0
        this.offset(width)
      },
      musicList(newVal){
        if(newVal.length==0){
          this.setPlaying(false)
          this.currentTime=0
        }
      },
      playing(newVal){
        if(this.musicList.length==0) {
          return
        }
        this.$nextTick(()=>{
          var audio=this.$refs.audio
          if(this.currentSong.url){
            newVal?audio.play():audio.pause()
          }
        })
      },
      currentSong(newSong){
        if (!newSong||!newSong.id) {
          return
        }
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          if(this.autoPlay){
            this.setPlaying(true)
            this.$refs.audio.play()
          }
        }, 1000)
      }
    },
    filters:{
      formatTime(val) {
        var second = ''
        var minute = ''
        second = Math.floor(val / 60)
        if (val % 60 == 0) {
          minute = '00'
        } else if (val % 60 >= 10) {
          minute = val % 60
        } else {
          minute = '0' + val % 60
        }
        return second + ':' + minute
      }
    },
    mounted(){
      if(window.localStorage.getItem('likeSongs')!=null){
          this.setMusiclists(JSON.parse(window.localStorage.getItem('likeSongs')))
      }
    },
    components:{
      VHead,
      Playlist,
      Message
    }
  }
</script>

<style scoped>
  .player .my-head{
    z-index: 100 !important;
    color: #fff;
  }
  .progress-btn-wrapper{
    width: 30px;
    height: 30px;
    position: absolute;
    left: 0;
    top: -10px;
  }
  .progress-btn-wrapper   .progress-btn{
    width: 6px;
    height: 6px;
    border-radius: 50%;
    border: 4px solid #ff6633;
    background: #f5f55f;
    margin-top: 5px;
  }
  .progress-wrapper{
    display: flex;
    width: 80%;
    height: 0.3rem;
    line-height: 0.3rem;
    margin: 0 auto;
    position: absolute;
    left: 0.35rem;
    bottom: 0.8rem;
  }
  .bar-inner{
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0,0,0,.3)
  }
  .bar-inner .progress{
    position: absolute;
    left: 0;
    top: 0;
    height: 4px;
    background: #fff;
    width: 20px;
  }
  .progress-wrapper .time{
    width: 30px;
    font-size: 12px;
  }
  .progress-wrapper .time-l{
    text-align: left;
  }
  .progress-wrapper .time-r{
    text-align: right;
  }
  .progress-wrapper .time-r i{
    font-style: normal;
    font-size: 12px;
  }
  .progress-wrapper .progress-bar-wrapper{
    flex: 1;
  }
  .operators{
    display: flex;
    height: 0.5rem;
    width: 100%;
    position: fixed;
    bottom: 0rem;
  }
  .operators div{
    width: 20%;
  }
  .operators .icon i{
    display: inline-block;
    width: 27px;
    height: 22px;
    background: url("../../assets/img/player.png");
  }
  .operators .icon .sequence{
    width: 27px;
    height: 22px;
    background-position: left -260px;
    margin-top: 0.04rem;
  }
  .operators .icon .random{
    background-position: left -74px;
    margin-top: 0.04rem;
  }
  .operators .icon .singles{
    background-position: left -233px;
    margin-top: 0.04rem;
  }
  .operators .icon .lists{
    background-position: left -206px;
    margin-top: 0.04rem;
  }
  .operators .icon .play-left{
    width: 20px;
    height: 20px;
    background-position: left -30px;
    margin-top: 0.04rem;
  }
  .operators .icon .play-right{
    width: 20px;
    height: 20px;
    background-position: left -53px;
    margin-top: 0.04rem;
  }
  .operators .icon .music-list{
    width: 20px;
    height: 20px;
    background: url("../../assets/img/list.png");
    margin-top: 0.04rem;
    background-size: contain;
  }
  .operators .icon-left i{
    float: right;
  }
  .operators .icon-center{
    text-align: center;
    padding: 0 20px;
  }
  .operators .icon-center i{
    width: 24px;
    height: 28px;
  }
  .operators .icon-center .play{
    background-position:-30px top;
  }
  .operators .icon-right i{
    float: left;
  }
  .singer{
    text-align: center;
    line-height: 0.2rem;
    font-weight: normal;
    font-size: 0.14rem;
  }
  .cd-wrapper{
    width: 3rem;
    height: 3rem;
    margin: 0.12rem auto;
  }
  .cd-wrapper .cd{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border: 10px solid hsla(0,0%,100%,.1);
    border-radius: 50%;
  }

  .cd-wrapper .play{
    animation: rotate 30s linear infinite;
    -webkit-animation:rotate 30s linear infinite;
  }

  @keyframes rotate {
    0% {transform: rotate(0);}
    100% {transform: rotate(360deg);}
  }

  .cd-wrapper .pause{
    -webkit-animation-play-state: paused;
    -moz-animation-play-state: paused;
    animation-play-state: paused;
    -ms-animation-play-state: paused;
    -o-animation-play-state: paused;
  }

  .cd-wrapper .cd img{
    border-radius: 50%;
  }
  .player .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: .6;
    -webkit-filter: blur(20px);
    filter: blur(20px);
  }
  .player{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    background: #000;
    z-index: 1002;
    color: #fff;
  }
  .song-wrapper{
    padding-top: 0.5rem;
  }
</style>
