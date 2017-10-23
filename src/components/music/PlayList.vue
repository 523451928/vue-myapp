<template name="slide-down">
  <transition name="slide-down">
    <div class="mask">
      <div class="close-mask" @click="close"></div>
      <div class="play-list">
        <div class="list" ref="list">
          <bscroll :data="musicList" ref="scroll" :refreshDelay="50" v-if="listShow">
            <div class="list-scroll">
              <ul>
                <li v-for="(song,index) in musicList" @click.stop="changeIndex(index)">
                  <i class="wave" :class="{'static':!playing}" v-show="index==currentIndex"></i>
                  <p>{{song.name}}</p>
                  <span class="del" @click.stop="delSong(index)"></span>
                  <span class="like-border" @click.stop="toggleLike(song)" :class="{'like':song.isLike}"></span>
                </li>
              </ul>
            </div>
          </bscroll>
          <i class="iconfont icon-dingwei-copy" @click="locationFn"></i>
        </div>
        <span class="del-all" @click="clearList">清空列表</span>
        <mt-switch v-model="isSetTime" @change="changeSwitch">
          定时停止
          <i v-show="countDown>0&&isSetTime">{{countDown | formatTime}}</i>
        </mt-switch>
        <transition name="slide-left">
          <div class="time-line" v-show="isSetTime">
            <ul class="time-line-wrapper">
              <li v-for="(time,index) in timeLineArr" :class="{'last-li':index==timeLineArr.length-1,'first-li':index==0,'active':index==activeIndex}">
                <span></span>
                <i @click="changeLine(index)">{{time}}分钟</i>
              </li>
              <div class="border"></div>
            </ul>
          </div>
        </transition>
        <div class="close-list" @click="close">
          关闭
        </div>
      </div>
      <confirm v-show="confirmShow" :title="title" @cancelFn="cancelFn" @confirmFn="confirmFn"></confirm>
    </div>
  </transition>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  import Bscroll from '../../pubulic/Bscroll.vue'
  import Confirm from '../../pubulic/Confirm.vue'
  export default{
    props:{
      musicList:{
        type:Array,
        default:[]
      },
      currentIndex:{
        type:Number,
        default:0
      },
      playing:{
        type:Boolean,
        default:false
      },
      listShow:{
        type:Boolean,
        default:true
      }
    },
    data(){
      return {
        confirmShow:false,
        title:"确认清空列表吗?",
        isSetTime:false,
        timeOut:null,
        interval:null,
        activeIndex:0,
        timeLineArr:[
            1,2,10,15,20
        ],
        countDown:0
      }
    },
    computed:{
      ...mapState([
          'timeSwitch'
      ]),
      timeLine(){
          return this.timeLineArr[this.activeIndex]
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
    methods:{
      ...mapMutations([
        'setCurrentIndex','clearMusicList','setPlayerShow','delSong','setAutoPlay','setPlaying','setTimeSwitch'
      ]),
      changeLine(index){
        if(index==this.activeIndex){
            return
        }
        this.activeIndex=index
        this.refreshTimeLine()
      },
      changeSwitch(val){
        this.setTimeSwitch(!val)
        if(!val){
          this.refreshTimeLine()
        }else{
          if(this.timeOut){
            this.countDown=0
            window.clearInterval(this.interval)
            window.clearTimeout(this.timeOut)
          }
        }
      },
      refreshTimeLine(){
        this.countDown=this.timeLine*60
        if(this.interval){
          window.clearInterval(this.interval)
        }
        if(this.timeOut){
          window.clearTimeout(this.timeOut)
        }
        this.interval=setInterval(()=>{
          this.countDown-=1
        },1000)
        this.timeOut=setTimeout(()=>{
          this.setPlaying(false)
          this.setTimeSwitch(false)
        },this.timeLine*60*1000)
      },
      changeIndex(index){
        this.setAutoPlay(true)
        this.setPlaying(true)
        this.setCurrentIndex(index)
        if(index<this.musicList.length-10){
          this.scrollTo(index)
        }
      },
      toggleLike(song){
        var arr=[]
        if(window.localStorage.getItem('likeSongs')!=null){
            arr=JSON.parse(window.localStorage.getItem('likeSongs'))
        }
        if(!song.isLike){
          this.$set(song,'isLike',true)
          arr.unshift(song)
        }else{
          song.isLike=false
          for(var i=0;i<arr.length;i++){
             if(song.id==arr[i].id) {
                arr.splice(i,1)
             }
          }
        }
        window.localStorage.setItem('likeSongs',JSON.stringify(arr))
      },
      locationFn(){
        if(this.currentIndex<this.musicList.length-10){
          this.scrollTo(this.currentIndex)
        }
      },
      scrollTo(index){
        if(document.getElementsByClassName('list-scroll')[0]){
          document.getElementsByClassName('list-scroll')[0].style=`transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1); transition-duration: 300ms; transform: translate(0px, -${index*40}px) translateZ(0px);`
        }
      },
      close(){
        this.$emit('close')
      },
      cancelFn(){
        this.confirmShow=false
      },
      confirmFn(){
        this.clearMusicList()
        this.confirmShow=false
        this.setPlayerShow(false)
        this.$emit('close')
      },
      clearList(){
        this.confirmShow=true
      }
    },
    watch:{
      timeSwitch(newVal){
        if(newVal){
          this.$refs.list.style.top='-0.5rem'
          this.$refs.list.style.background="-webkit-linear-gradient(160deg,#737373,#333,#666)";
        }else{
          this.$refs.list.style.top='0rem'
          this.$refs.list.style.background=""
        }
        this.isSetTime=newVal
      }
    },
    mounted(){
      this.isSetTime = this.timeSwitch
    },
    components:{
      Bscroll,
      Confirm
    }
  }
</script>

<style scope>
  .time-line-wrapper{
    position: relative;
    display: flex;
    width: 90%;
    margin-left: 5%;
  }
  .time-line-wrapper .border{
    height: 2px;
    width: 100%;
    position: absolute;
    top: 0.16rem;
    background: #ccc;
    left: 0;
  }
  .play-list  .time-line-wrapper li{
    width: 25%;
    height: 100%;
    padding: 0;
    margin: 0;
    line-height: 0.7rem;
    position: relative;
    color: #666;
  }
  .play-list  .time-line-wrapper li i{
    font-style: normal;
    position: absolute;
    left: -0.2rem;
    height: 0.5rem;
    width: 0.5rem;
    text-align: center;
    font-size: 12px;
  }
  .play-list  .time-line-wrapper li span{
    width: 0.12rem;
    height: 0.12rem;
    border-radius: 50%;
    background: #ccc;
    display: inline-block;
    position: absolute;
    top:0.11rem;
    transition: all .3s;

  }
  .play-list  .time-line-wrapper .active span{
    box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
    width: 0.16rem;
    height: 0.16rem;
    top:0.08rem;
    left: -0.02rem;
    background: #fff;
    border: 1px solid #ccc;
    z-index: 100;

  }
  .play-list  .time-line-wrapper .first-li i{
    /*margin-left: 0.06rem;*/
  }
  .play-list  .time-line-wrapper .active i{
    color: #999;
  }
  .play-list  .time-line-wrapper .last-li{
    width: 0;
    margin-right: 0.1rem;
  }
  .time-line{
    height: 0.5rem;
    position: relative;
    bottom: 0.8rem;
    background: rgba(255,255,255,0.95);
    color: #666;
    z-index: 1;
  }
  .mint-switch{
    top: 0.1rem;
    left: 0.1rem;
    width: 1.56rem;
    font-size: 12px;
  }
  .mint-switch-label{
    margin-left: 0;
  }
  .mint-switch i{
    font-size: 12px;
    font-style: normal;
  }
  .icon-dingwei-copy{
    position: fixed;
    bottom: 0.64rem;
    font-size: 16px;
    color: #fff;
    z-index: 100;
    right: 1.8rem;
  }
  .play-list li{
    height: 40px;
    line-height: 40px;
    margin-left: 0.2rem;
    position: relative;
    color: #ccc;
  }
  .play-list li p{
    width: 70%;
    display: inline-block;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .play-list li .wave{
    width: 0.1rem;
    height: 0.1rem;
    display: inline-block;
    background: url('../../assets/img/wave.gif');
    margin-right: 0.02rem;
    position: relative;
    left: 0px;
    bottom: 0rem;
  }
  .play-list li .static{
    background: url('../../assets/img/wave.png');
  }
  .list-scroll li .del{
    float: right;
    width: 22px;
    height: 22px;
    display: inline-block;
    background: url('../../assets/img/del.png');
    margin:0.07rem 0.12rem 0 0;
    background-size: contain;
  }
  .list-scroll li .like-border{
    float: right;
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url('../../assets/img/like-border.png');
    margin:0.07rem 0.1rem 0 0;
    background-size: cover;
  }
  .list-scroll li .like{
    float: right;
    width: 24px;
    height: 20px;
    display: inline-block;
    background: url('../../assets/img/like.png');
    margin:0.07rem 0.08rem 0 0;
    background-size: cover;
  }

  .mask{
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    z-index: 100;
  }
  .close-mask{
    position: absolute;
    top: 0;
    background: none;
    width: 100%;
    height: 4rem;
    z-index: 1;
  }
  .play-list{
    position: absolute;
    bottom: 0;
    height: 5rem;
    background: -webkit-linear-gradient(160deg,#737373,#333,#666);
    color: #fff;
    width: 100%;
    z-index: 2;
  }
  .play-list .list{
    height:4rem;
    overflow: hidden;
    position: relative;
    transition: all .3s;
  }
  .del-all {
    width: 1rem;
    height: 0.26rem;
    text-align: center;
    line-height: 0.26rem;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 0.14rem;
    display: block;
    right: .1rem;
    margin: 0.12rem auto;
    position: absolute;
  }
  .close-list{
    width: 100%;
    height: 0.48rem;
    line-height: 0.48rem;
    text-align: center;
    background: #222;
    color: #999;
    font-size: 0.16rem;
    position: absolute;
    bottom: 0;
  }
</style>
