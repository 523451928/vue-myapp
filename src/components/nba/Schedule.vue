<template>
  <div class="schedule-wrapper">
    <div class="pick-tools">
      <div class="pick-top" :style="`top:${scrollY}px`" :class="{'hasTransition':hasTransition}">
        <span class="pick-prev" @click.stop="prevDay">
                <svg width="20" height="20" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink"><g class="transform-group"><g
                  transform="scale(0.015625, 0.015625)"><path
                  d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z"
                  fill="#5e7a88"></path></g></g></svg>
            </span>
        <span>{{scheduleObj.cur_date}}</span><i class="date-icon" @click="selectPick"></i>
        <span class="pick-next" @click.stop="nextDay" >
                        <svg width="20" height="20" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink"><g class="transform-group"><g
                          transform="scale(0.015625, 0.015625)"><path
                          d="M761.056 532.128c0.512-0.992 1.344-1.824 1.792-2.848 8.8-18.304 5.92-40.704-9.664-55.424L399.936 139.744c-19.264-18.208-49.632-17.344-67.872 1.888-18.208 19.264-17.376 49.632 1.888 67.872l316.96 299.84-315.712 304.288c-19.072 18.4-19.648 48.768-1.248 67.872 9.408 9.792 21.984 14.688 34.56 14.688 12 0 24-4.48 33.312-13.44l350.048-337.376c0.672-0.672 0.928-1.6 1.6-2.304 0.512-0.48 1.056-0.832 1.568-1.344C757.76 538.88 759.2 535.392 761.056 532.128z"
                          fill="#5e7a88"></path></g></g></svg>
                    </span>
      </div>
    </div>
    <bscroll  v-if="scheduleObj.list && scheduleObj.list.length>0" :data="scheduleObj.list" :listenScroll="true" :probeType="2" @scroll="scroll">
      <schecont :list="scheduleObj.list"></schecont>
    </bscroll>
    <div class="no-play" v-show="scheduleObj.list && scheduleObj.list.length==0">今日暂无比赛</div>
    <transition name="scale">
      <div class="pick-wrapper" v-show="pickShow" @click="hidePick">
        <v-pickdate   :pickStyle="pickStyle" :pickDate="pickDate" @output="writePut"  @cancelPick="hidePick"></v-pickdate>
      </div>
    </transition>
  </div>
</template>

<script>
  import VPickdate from '../../pubulic/Pickdate.vue'
  import {getNbaSchedule} from '../../api/api'
  import Bscroll from '../../pubulic/Bscroll.vue'
  import Schecont from '../../pubulic/Schecont.vue'

  export default{
    data(){
      return {
        scheduleObj:{},
        pickStyle:{
          left:"50%",
          marginLeft:"-50%",
          marginTop:"-100px",
          top:"50%",
          width:"100%"
        },
        scrollY:0,
        pickShow:false,
        pickDate:'2017-08-08',
        hasTransition:false
      }
    },
    methods:{
      writePut(val){
        this.getData(val)
        this.pickShow=false
      },
      hidePick(){
        this.pickShow=false
      },
      prevDay(){
        this.getData(this.scheduleObj.pre_date)
      },
      nextDay(){
        this.getData(this.scheduleObj.next_date)
      },
      selectPick(){
        this.pickShow=true
        this.pickDate=this.scheduleObj.cur_date
      },
      scroll(pos){
//        this.hasTransition=false
//        if(pos.y<0){
//          this.scrollY=Math.max(pos.y,-44)
//        }else{
//          this.scrollY=0
//        }
      },
      getData(md){
        this.$loading('加载中...')
        getNbaSchedule(md).then((res)=>{
          this.$loading.close()
          this.scrollY=0
          this.hasTransition=true
          if(res["schedule@getList"].code=='-10'){
              this.$dialog.center('接口暂未开放！')
          }
          this.scheduleObj=res["schedule@getList"].data
        })
      }
    },
    mounted(){
      this.getData('')
    },
    components:{
      VPickdate,
      Bscroll,
      Schecont
    }
  }
</script>

<style scoped>
  .team-info{
    width: 1.1rem;
    text-align: center;
  }
  .scale-1px strong{
    margin:0.04rem 0 0.06rem 0;
    display: inline-block;
  }
  .hasTransition{
    transition: all .5s;
  }
  .match-list{
    background: #fff;
  }
  .match-wrapper{
    padding: 0.12rem 0.14rem;
  }
  .match-item{
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-flex: 1;
  }
  .match-item .team{
    width: 40%;
    display: flex;
  }
  .team img{
    width: 0.48rem;
    height: 0.48rem;
  }
  .match-item .time{
    width: 20%;
    text-align: center;
  }
  .date-icon{
    width: 0.24rem;
    height: 0.24rem;
    display: inline-block;
    background: url("../../assets/img/calendar.png");
    background-size: cover;
    position: relative;
    top:0.05rem;
    left: 0.02rem;
  }
  .schedule-wrapper{
    background: #f1f3fa;
    min-height: 6rem;
  }
  .no-play{
    width: 100%;
    height: 1.2rem;
    text-align: center;
    background: #fff;
    line-height: 1.2rem;
    color: #666;
  }
  .pick-top{
    height: 44px;
    line-height: 44px;
    text-align: center;
    position: relative;
    background: #f1f3fa;
    z-index: 1000;
  }
  .pick-top span{
    font-size: 0.16rem;
    color: #666;
  }
  .pick-top .pick-prev{
    position: absolute;
    left: 0.2rem;
    top: 0.04rem;
  }
  .pick-top .pick-next{
    position: absolute;
    right: 0.2rem;
    top: 0.04rem;
  }
  .scale-enter-active,.scale-leave-active,#pick-date{
    transition: all .5s;
  }
  .scale-enter,.scale-leave-to{
    opacity: 0;
  }
  .scale-enter  #pick-date,.scale-leave-to  #pick-date{
    transform: scale(.5) !important;
  }
  .pick-wrapper{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    position: fixed;
    top: 0;
    left: 0;
  }
</style>
