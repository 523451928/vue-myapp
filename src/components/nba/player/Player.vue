<template>
  <transition name="slide">
    <div class="nba-player">
      <v-head :msg="titleMsg" @back="back"></v-head>
      <bscroll :data="data">
        <div>
          <div class="player-info">
            <div class="img-box">
              <img :src="playerDetail.portrait">
            </div>
            <div class="player-text">
              <h3>{{playerDetail.cnalias}}  {{playerDetail.number}}号</h3>
              <p class="team-logo">
               <img :src="playerDetail.teamlogo">{{playerDetail.teamname}} | {{playerDetail.position}}
              </p>
            </div>
          </div>
          <div class="player-data clearfix">
            <div class="item">
              <strong>{{playerDetail.pointsPG}}</strong>
              <p>得分</p>
            </div>
            <div class="item">
              <strong>{{playerDetail.reboundsPG}}</strong>
              <p>篮板</p>
            </div>
            <div class="item">
              <strong>{{playerDetail.assistsPG}}</strong>
              <p>助攻</p>
            </div>
            <div class="item last">
              <strong>{{playerDetail.stealsPG}}</strong>
              <p>抢断</p>
            </div>
          </div>
          <div class="basic-information">
            <h2 class="lv-title">基本信息</h2>
            <table cellspacing="0" cellpadding="0" >
              <tr>
                <td width="50%" class="first-td">
                  <p>生日</p>
                  <div>{{playerDetail.birthdate}}</div>
                </td>
                <td width="50%">
                  <p>出生地</p>
                  <div>{{playerDetail.birthplace}}</div>
                </td>
              </tr>
              <tr>
                <td width="50%">
                  <p>薪金</p>
                  <div>{{playerDetail.yearsalary}}</div>
                </td>
                <td width="50%">
                  <p>身高/体重</p>
                  <div>{{playerDetail.height}}/{{playerDetail.weight}}</div>
                </td>
              </tr>
              <tr>
                <td width="100%" class="no-border " colspan="2">
                  <p>选秀</p>
                  <div>{{playerDetail.showing}}</div>
                </td>
              </tr>
            </table>
          </div>
          <div class="rank">
            <h2 class="lv-title">联盟统计排名</h2>
            <table cellspacing="0" cellpadding="0" >
              <tr>
                <td width="33.3%" class="first-td">
                  <div>{{playerDetail.pointsRank}}</div>
                  <p>得分</p>
                </td>
                <td width="33.3%">
                  <div>{{playerDetail.assistsRank}}</div>
                  <p>助攻</p>
                </td>
                <td width="33.3%" class="no-border-right">
                  <div>{{playerDetail.stealsRank}}</div>
                  <p>抢断</p>
                </td>
              </tr>
              <tr>
                <td width="33.3%" class="no-border-bottom">
                  <div>{{playerDetail.fgMadeRank}}</div>
                  <p>盖帽</p>
                </td>
                <td width="33.3%" class="no-border-bottom">
                  <div>{{playerDetail.blocksRank}}</div>
                  <p>投篮</p>
                </td>
                <td width="33.3%" class="no-border-right no-border-bottom">
                  <div>{{playerDetail.reboundsRank}}</div>
                  <p>篮板</p>
                </td>
              </tr>
            </table>
          </div>
          <div class="rank">
            <h2 class="lv-title">本赛季技术统计</h2>
            <div class="charts-container">
              <div class="charts-head clearfix">
                <div class="average">
                  <span></span>联盟平均
                </div>
                <div class="player-box">
                  <span></span>球员
                </div>
              </div>
              <div class="charts-box">
                <div class="line-box">
                  <div class="line" :class="{'last-li':index==scoreArr.length-1}" v-for="(item,index) in scoreArr">
                    <span>{{item}}</span>
                  </div>
                  <div class="charts-foot">
                    <div>得分</div>
                    <div>篮板</div>
                    <div>助攻</div>
                  </div>
                </div>
                <div class="score-container" v-if="playerDetail.pointsPG">
                  <div>
                    <p class="player-score">
                      <i>{{playerDetail.pointsPG.toFixed(1)}}</i>
                      <span :style="{'height':playerDetail.pointsPG/10*0.4+'rem'}"></span>
                    </p>
                    <p class="average-score">
                      <i>{{playerDetail.pointsConferencePG.toFixed(1)}}</i>
                      <span class="last-span" :style="{'height':playerDetail.pointsConferencePG/10*0.4+'rem'}"></span>
                    </p>
                  </div>
                  <div>
                    <p class="player-resbounce">
                      <i>{{playerDetail.reboundsPG.toFixed(1)}}</i>
                      <span :style="{'height':playerDetail.reboundsPG/10*0.4+'rem'}"></span>
                    </p>
                    <p class="average-resbounce">
                      <i>{{playerDetail.reboundsConferencePG.toFixed(1)}}</i>
                      <span class="last-span"  :style="{'height':playerDetail.reboundsConferencePG/10*0.4+'rem'}"></span>
                    </p>
                  </div>
                  <div>
                    <p class="player-assists">
                      <i>{{playerDetail.assistsPG.toFixed(1)}}</i>
                      <span :style="{'height':playerDetail.assistsPG/10*0.4+'rem'}"></span>
                    </p>
                    <p class="average-assists">
                      <i>{{playerDetail.assistsConferencePG.toFixed(1)}}</i>
                      <span class="last-span" :style="{'height':playerDetail.assistsConferencePG/10*0.4+'rem'}"></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <table cellspacing="0" cellpadding="0" >
              <tr>
                <td width="33.3%" class="first-td">
                  <div>{{playerDetail.games}}</div>
                  <p>出场次数</p>
                </td>
                <td width="33.3%">
                  <div>{{playerDetail.gamesStarted}}</div>
                  <p>首发次数</p>
                </td>
                <td width="33.3%" class="no-border-right">
                  <div>{{playerDetail.minutesPG}}</div>
                  <p>时间</p>
                </td>
              </tr>
              <tr>
                <td width="33.3%" class="first-td">
                  <div>{{playerDetail.fgPCT | percent}}</div>
                  <p>投篮</p>
                </td>
                <td width="33.3%">
                  <div>{{playerDetail.threesPCT | percent}}</div>
                  <p>三分</p>
                </td>
                <td width="33.3%" class="no-border-right">
                  <div>{{playerDetail.ftPCT | percent}}</div>
                  <p>罚球</p>
                </td>
              </tr>
              <tr>
                <td width="33.3%" class="first-td">
                  <div>{{playerDetail.offensiveReboundsPG}}</div>
                  <p>前篮板</p>
                </td>
                <td width="33.3%">
                  <div>{{playerDetail.defensiveReboundsPG}}</div>
                  <p>后篮板</p>
                </td>
                <td width="33.3%" class="no-border-right">
                  <div>{{playerDetail.stealsPG}}</div>
                  <p>抢断</p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </bscroll>
    </div>
  </transition>
</template>

<script>
  import VHead from "../../../pubulic/Head.vue"
  import Bscroll from "../../../pubulic/Bscroll.vue"
  import {getNbaPlayer} from "../../../api/api"
  export default{
    data(){
      return {
        titleMsg:"球员信息",
        playerDetail:{},
        scoreArr:[40,30,20,10,0].reverse()
      }
    },
    methods:{
      back(){
        this.$router.back()
      }
    },
    computed:{
      data(){
        var arr=[]
        if(this.playerDetail.cnalias){
          arr[0]=this.playerDetail
          return arr
        }
      }
    },
    mounted(){
      getNbaPlayer(this.$router.currentRoute.params.id).then((res)=>{
        this.playerDetail=res.player_detail
      })
    },
    filters:{
      percent(val){
        return (val*100).toFixed(1)+'%'
      }
    },
    components:{
      VHead,
      Bscroll
    }
  }
</script>

<style scoped>
  .line-box{
    position: absolute;
    width: 90%;
  }
  .score-container{
    width: 100%;
    position: absolute;
    top: 0.43rem;
  }
  .score-container div{
    width: 30%;
    display: inline-block;
    text-align: center;
    vertical-align: top;
  }
  .charts-foot div{
    width: 33.3%;
    margin-top: 0.04rem;
  }
  .score-container div p{
    margin-left: 0.2rem;
    position: relative;
    bottom: 0rem;
    float: left;
    width: 0.24rem;
  }
  .score-container div p span{
    position: relative;
    display: inline-block;
    width: 0.24rem;
    height: 0rem;
    background: #ef4f4f;
    vertical-align: top;
    transition: all .5s;
  }
  .score-container div p i{
    position: relative;
    font-style: normal;
  }
  .score-container div p .last-span{
    background: #00bcd4;
    height: 0rem;
    transition: all .5s;
  }
  .charts-foot{
    display: flex;
  }
  .charts-foot div{
    width: 33.3%;
    text-align: center;
  }
  .charts-box{
    padding: 0 0.12rem 0 0.32rem;
  }
  .charts-box .line{
    height: 0.38rem;
    position: relative;
    border-top: 1px solid #d1d1d5;
    border-left: 1px solid #d1d1d5;
  }
  .charts-box .last-li{
    /*border-bottom: 1px solid #d1d1d5;*/
    height: 0;
  }
  .charts-box .line span{
    position: absolute;
    left: -0.22rem;
    top:-.08rem;
  }
  .charts-head div{
    float: right;
    margin:0.1rem 0.1rem 0.3rem 0;
  }
  .charts-head div span{
    display: inline-block;
    width: 0.12rem;
    height: 0.12rem;
    background: #00bcd4;
    margin-right: 0.02rem;
  }
  .charts-head .player-box span{
    background: red;
  }
  .charts-container{
    width: 100%;
    height: 2.6rem;
    background: #fff;
    border-bottom: 1px solid #ccc;
    position: relative;
  }
  .basic-information td{
    width: 50%;
  }
  .basic-information .width-full{
    width: 100%;
  }
  .rank table tr td{
    border-right: 1px solid #ccc;
    text-align: center;
  }
  table{
    width: 100%;
  }

  table tr td{
    padding: 0.1rem;
    border-bottom:1px solid #ccc;
  }
  table tr .no-border{
    border-bottom: 0;
  }
  .rank table tr .no-border-right{
    border-right: 0;
  }
  .rank table tr .no-border-bottom{
    border-bottom: 0;
  }
  table tr td p{
    font-size: 12px;
    color: #787878;
  }
  table tr td div{
    font-size: 16px;
  }
  .lv-title{
    font-weight: normal;
    text-indent: 0.12rem;
    line-height: 0.34rem;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    background: #f1f3fa;
  }
  .player-data{
    padding: 0.12rem 0;
  }
  .player-data .item{
    width: 24.5%;
    float: left;
    border-right: 1px solid #ccc;
    text-align: center;
  }
  .player-data .item strong{
    font-size: 20px;
    font-weight: normal;
  }
  .player-data .item p{
    font-size: 12px;
    color: #787878;
  }
  .player-data .item div{
    font-size: 14px;
  }
  .player-data .last{
    border: none;
  }
  .player-data{
    border-bottom: 1px solid #f5f5f5;
    border-top: 1px solid #f5f5f5;
  }
  .player-info{
    display: flex;
  }
  .player-text{
    padding-left: 0.2rem;
    position: relative;
    width: 2rem;
  }
  .player-text .team-logo{
    position: relative;
    text-indent: 30px;
    line-height: 30px;
  }
  .player-text .team-logo img{
    position: absolute;
    top:0px;
    width: 30px;
    left: 0;
  }
  .player-text h3{
    font-size: 22px;
    font-weight: 300;
    margin-top: 0.4rem;
    text-indent: 6px;
    margin-bottom: 0.1rem;
  }
  .img-box{
    width: 1.6rem;
    height: 1.18rem;
    overflow: hidden;
  }
  .img-box img{
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .nba-player{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    background: #fff;
    z-index: 1000;
    color: #666;
  }
  .wrapper{
    margin-top: 0.5rem;
  }
</style>
