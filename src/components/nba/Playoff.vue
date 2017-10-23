<template>
  <div class="playoff-wrapper">
    <bscroll v-if="playoffData.final" :data="playoffData.final.last">
      <div class="playoff-content">
        <div class="dule last">
          <div class="dule-title">决赛</div>
          <section>
            <div class="team-left">
              <div class="team-instance">W{{playoffData.final.last[0].conferenceseed1}}</div>
              <div class="team-logo">
                <img :src="playoffData.final.last[0].logo1">
              </div>
              <div class="team-name">{{playoffData.final.last[0].shortname1}}</div>
              <div class="team-score">{{playoffData.final.last[0].wincount1}}</div>
            </div>
            <div class="line"></div>
            <div class="team-right">
              <div class="team-score">{{playoffData.final.last[1].wincount2}}</div>
              <div class="team-name">{{playoffData.final.last[1].shortname2}}</div>
              <div class="team-logo">
                <img :src="playoffData.final.last[1].logo2">
              </div>
              <div class="team-instance">E{{playoffData.final.last[1].conferenceseed2}}</div>
            </div>
          </section>
        </div>
        <div class="dule" v-if="key!='final'" v-for="(team,key) in playoffObj" >
          <div class="dule-title">
            <strong>{{key=='half'?'半决赛':key=='second'?'第二轮':key=='first'?'首轮':key}}</strong>
          </div>
          <section>
            <div class="teams-left">
              <div v-for="(item,index) in team['west']">
                <div class="team-item" >
                  <div class="team-instance">W{{item.conferenceseed1}}</div>
                  <div class="team-logo">
                    <img :src="item.logo1">
                  </div>
                  <div class="team-name">{{item.shortname1}}</div>
                  <div class="team-score">{{item.wincount1}}</div>
                </div>
                <div  class="team-item" :class="{'no-margin':index==team['west'].length-1}">
                  <div class="team-instance">W{{item.conferenceseed2}}</div>
                  <div class="team-logo">
                    <img :src="item.logo2">
                  </div>
                  <div class="team-name">{{item.shortname2}}</div>
                  <div class="team-score">{{item.wincount2}}</div>
                </div>
              </div>
            </div>
            <div class="line" :class="{'half-line':key=='half','second-line':key=='second','first-line':key=='first'}"></div>
            <div class="teams-right">
              <div v-for="(item,index) in team['east']">
                <div class="team-item">
                  <div class="team-score">{{item.wincount1}}</div>
                  <div class="team-name">{{item.shortname1}}</div>
                  <div class="team-logo">
                    <img :src="item.logo1">
                  </div>
                  <div class="team-instance">E{{item.conferenceseed1}}</div>
                </div>
                <div  class="team-item" :class="{'no-margin':index==team['east'].length-1}">
                  <div class="team-score">{{item.wincount2}}</div>
                  <div class="team-name">{{item.shortname2}}</div>
                  <div class="team-logo">
                    <img :src="item.logo2">
                  </div>
                  <div class="team-instance">E{{item.conferenceseed2}}</div>
                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    </bscroll>
  </div>
</template>

<script>
  import {getNbaPlayoff} from '../../api/api'
  import Bscroll from "../../pubulic/Bscroll.vue"
  export default{
    data(){
      return {
        playoffData:{}
      }
    },
    computed:{
      playoffObj(){
         var obj={
             half:{west:[],east:[]},
             second:{west:[],east:[]},
             first:{west:[],east:[]}
         }
         if(this.playoffData.half){
           obj.half.west=this.playoffData.half.west
           obj.half.east=this.playoffData.half.east
           obj.second.west=this.playoffData.second.west
           obj.second.east=this.playoffData.second.east
           obj.first.west=this.playoffData.first.west
           obj.first.east=this.playoffData.first.east
         }
         return obj
      }
    },
    mounted(){
      this.$loading("加载中...")
      getNbaPlayoff().then((res)=>{
          this.$loading.close()
          this.playoffData=res.get_playoff_vs.data
      })
    },
    components:{
      Bscroll
    }
  }
</script>

<style scoped>
  .teams-left,.teams-right{
    width: 45%;
    text-align: center;
  }
  .team-item{
    width: 100%;
    line-height: 0.3rem;
    height: 0.3rem;
    display: flex;
    margin-bottom: 0.1rem;
    background: #f1f3fa;
  }
  .half-line{
    background: url(http://3gimg.qq.com/wap30/infoapp/touch/nba_new/images/duel/img/2.png) no-repeat center;
    background-size: contain;
  }
  .first-line{
    background: url(http://3gimg.qq.com/wap30/infoapp/touch/nba_new/images/duel/img/4.png) no-repeat center;
    background-size: contain;
  }
  .second-line{
    background: url(http://3gimg.qq.com/wap30/infoapp/touch/nba_new/images/duel/img/3.png) no-repeat center;
    background-size: contain;
  }
  .no-margin{
    margin-bottom: 0rem;
  }
  .playoff-content{
    padding: 0 0.1rem;
  }
  .dule{
    margin-top: 0.1rem;
  }
  .dule-title{
    height: .43rem;
    line-height: .43rem;
    font-size: .16rem;
    text-align: center;
    position: relative;
  }
  .dule-title strong{
    position: relative;
    z-index: 10;
    padding: 0 0.12rem;
    background: #fff;
    font-size: .16rem;
    font-weight: normal;
  }
  .dule-title:after{
    content: '';
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 0;
    height: .01rem;
    background: #e7e7e7;
    width: 100%;
  }
  .last .dule-title:after{
    content: '';
    background: none;
  }
  section{
    display: flex;
    width: 100%;
  }

  .team-left,.team-right{
    height: 0.3rem;
    width: 45%;
    display: flex;
    line-height: 0.3rem;
    text-align: center;
    background: #f1f3fa;
  }
  .team-logo img{
    width: 0.3rem;
    height: 0.3rem;
  }
  .team-instance{
    width: 20%;
  }
  .team-logo{
    width: 20%;
  }
  .team-name{
    width: 45%;
  }
  .team-score{
    width: 15%;
    background: #f5f5f5;
    color: #f63;
  }
  .line{
    width: 10%;
  }
  .last{
    padding-top: .2rem;
    padding-bottom: .06rem;
    margin-bottom: .1rem;
    background: url(http://3gimg.qq.com/wap30/infoapp/touch/nba_new/images/duel/img/6.png) no-repeat right bottom,url("http://3gimg.qq.com/wap30/infoapp/touch/nba_new/images/duel/img/7.png") no-repeat left bottom,url("http://3gimg.qq.com/wap30/infoapp/touch/nba_new/images/duel/img/5.png") no-repeat center bottom;
    background-size: .85rem auto,.85rem auto,.3rem auto;
  }
</style>
