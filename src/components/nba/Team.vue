<template>
  <div class="team-wrapper">
    <div class="team-card" ref="team-card">
      <div class="team">
        <div class="item">
          <p class="team-name">{{teamObj.cnalias}}</p>
          <p>历史总冠军{{teamObj.historychampion}}次</p>
        </div>
        <div class="item-center">
          <img ref="logo" :src="teamObj.icon">
        </div>
        <div class="item last">
          <p class="team-name">{{teamObj.wins}}胜 {{teamObj.losses}}负</p>
          <p>{{teamObj.conference}}排名{{teamObj.conferenceseed}}次</p>
        </div>
      </div>
    </div>
    <bscroll :data="scrollData" :listenScroll="true" :probeType="3" :pullup="true" @scroll="scroll">
      <div>
        <div class="tab">
          <ul>
            <li v-for="(item,index) in tabArr" @click="changeTab(index)" :class="{'active':index==activeIndex}">
              {{item.text}}
            </li>
          </ul>
        </div>
        <div class="container">
          <div class="news-list" v-if="activeIndex==0">
            <ul>
              <li v-for="(item,index) in newsList">
                <div class="news-item scale-1px">
                  <div class="news-title">{{item.title}}</div>
                  <div class="img-box">
                    <img v-lazy="item.coverImage">
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="schedule" v-if="activeIndex==1">
            <div class="month-tab">
              <ul>
                <li v-for="(item,index) in monthArr" @click="changeMonth(item,index)"
                    :class="{'active':index==monthIndex}">{{item}}月
                </li>
              </ul>
              <div class="no-game" v-if="gameList.length==0">本月暂无比赛</div>
              <schecont :list="gameList" v-if="gameList.length>0" :showDay="true"></schecont>
            </div>
          </div>
          <div class="data" v-if="activeIndex==2">
            <div class="team-honor">
              <div class="item">
                <i class="icon"></i>
                <p>{{teamObj.division}}第{{teamObj.divisionseed}}</p>
              </div>
              <div class="item">
                <i class="icon"></i>
                <p>夺冠{{teamObj.historychampion}}次</p>
              </div>
              <div class="item no-border">
                <i class="icon"></i>
                <p>{{teamObj.coach}}</p>
              </div>
            </div>
            <table width="100%" class="lincoapp-nba-table1 skin-statsTech" data-code="0" cellspacing="0">
              <thead>
                <tr>
                  <td>本赛季</td>
                  <td>得分</td>
                  <td>篮板</td>
                  <td>助攻</td>
                  <td>命中率</td>
                </tr>
              </thead>
              <tbody>
                <tr class="first-tr">
                    <td>
                      <div><i></i><strong>主场</strong></div>
                    </td>
                    <td>{{teamObj.homePoints}}</td>
                    <td>{{teamObj.homeRebounds}}</td>
                    <td>{{teamObj.homeAssists}}</td>
                    <td>{{teamObj.homeFgMade}}%</td>
                </tr>
                <tr>
                    <td>
                      <div ><i></i><strong>客场</strong></div>
                    </td>
                    <td>{{teamObj.awayPoints}}</td>
                    <td>{{teamObj.awayRebounds}}</td>
                    <td>{{teamObj.awayAssists}}</td>
                    <td>{{teamObj.awayFgMade}}%</td>
                </tr>
              </tbody>
            </table>
            <div class="rank-box">
              <div class="rank-title">
                <strong>场均得分{{teamObj.pointsPG}}</strong> <span>联盟排名{{teamObj.pointsConference}}</span>
              </div>
              <div class="rank-container">
                <ul>
                  <li v-for="(item,index) in teamObj.pointsarr" >
                    <div class="rank-item scale-1px">
                      <i>{{index+1}}</i>
                      <div class="name">{{item.playername}}</div>
                      <div class="count">{{item.data}}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="rank-box">
              <div class="rank-title">
                <strong>场均篮板{{teamObj.reboundsPG}}</strong> <span>联盟排名{{teamObj.reboundsConference}}</span>
              </div>
              <div class="rank-container">
                <ul>
                  <li v-for="(item,index) in teamObj.reboundsarr" >
                    <div class="rank-item scale-1px">
                      <i>{{index+1}}</i>
                      <div class="name">{{item.playername}}</div>
                      <div class="count">{{item.data}}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="rank-box">
              <div class="rank-title">
                <strong>场均助攻{{teamObj.assistsPG}}</strong> <span>联盟排名{{teamObj.assistsConference}}</span>
              </div>
              <div class="rank-container">
                <ul>
                  <li v-for="(item,index) in teamObj.assistsarr" >
                    <div class="rank-item scale-1px">
                      <i>{{index+1}}</i>
                      <div class="name">{{item.playername}}</div>
                      <div class="count">{{item.data}}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="lineup" v-if="activeIndex==3">
            <div class="all-player">全体队员</div>
            <div class="player-list">
              <ul class="clearfix">
                <li v-for="(player,index) in playerList">
                  <div class="player-box" @click="toPlayer(player)">
                    <div class="img-box">
                      <img :src="player.logo">
                    </div>
                    <p class="position">{{player.position}}</p>
                    <p>{{player.cnalias}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </bscroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getTeamDetail, getTeamNews, getMonthListByTeam,getNbaTeamPlayer} from '../../api/api'
  import {prefixStyle} from '../../assets/js/dom'
  import Bscroll from "../../pubulic/Bscroll.vue"
  import Schecont from '../../pubulic/Schecont.vue'
  const transform = prefixStyle('transform')
  export default{
    data(){
      return {
        teamObj: {},
        teamId: '',
        month: '',
        newsList: [],
        gameList: [],
        playerList:[],
        tabArr: [
          {text: "动态", code: "news"},
          {text: "赛程", code: "schedule"},
          {text: "数据", code: "data"},
          {text: "阵容", code: "lineup"}
        ],
        monthIndex: 0,
        activeIndex: 0,
        scrollData: []
      }
    },
    methods: {
      changeTab(index){
        this.activeIndex = index
        switch (index) {
          case 0:
            this.scrollData = this.newsList
            break;
          case 1:
            this.scrollData = this.gameList
            if (this.gameList.length == 0) {
              this._getMonthListByTeam()
            }
            break;
          case 2:
            this.scrollData = []
                break;
          case 3:
            this.scrollData=this.playerList
            if(this.playerList.length==0){
              this._getNbaTeamPlayer(this.teamId)
            }
            break;
        }
      },
      toPlayer(item){
        this.$router.push({
          path:`/nba/warriors/${item.id}`
        })
      },
      changeMonth(item, index){
        this.monthIndex = index
        this.month = item
        this._getMonthListByTeam()
      },
      scroll(pos){
        var scale = 1
        var percent = Math.abs(pos.y / 150)
        if (pos.y < 0) {
          this.$refs['team-card'].style.top = Math.max(-150, pos.y) + 'px'
        } else {
          scale = 1 + percent
          this.$refs['team-card'].style.top = '0px'
          this.$refs['logo'].style[transform] = `scale(${scale})`
        }
      },
      _getNbaTeamPlayer(id){
          console.log(id)
        getNbaTeamPlayer(id).then((res)=>{
          this.playerList=res["team_player"].players
          this.scrollData=this.playerList
        })
      },
      _getMonthListByTeam(){
        getMonthListByTeam(this.teamId, this.month).then((res) => {
          if(res["schedule@getMonthListByTeam"].data){
            this.gameList = res["schedule@getMonthListByTeam"].data.list
            this.scrollData = this.gameList
          }
        })
      },
      _getTeamDetail(id){
        switch (id) {
          case '9':
            this.$refs['team-card'].style.background = '#0E4582'
            break;
          case '5':
            this.$refs['team-card'].style.background = '#570129'
            break;
          case '24':
            this.$refs['team-card'].style.background = '#2a2a2a'
            break;
        }
        this.$loading('加载中...')
        getTeamDetail(id).then((res) => {
          this.teamObj = res.team_detail
          this.$loading.close()
        })
        getTeamNews(id).then((res) => {
          if(res.team_news_new.data[id]){
            this.newsList = res.team_news_new.data[id].list
            this.scrollData = this.newsList
          }
        })
      },
    },
    computed: {
      monthArr(){
        var arr = []
        for (var i = 0; i < 8; i++) {
          if (i + this.initMotnth <= 12) {
            arr.push(i + this.initMotnth)
          } else {
            arr.push(i + this.initMotnth - 12)
          }
        }
        return arr
      }
    },
    components: {
      Bscroll,
      Schecont
    },
    watch: {
      $route(val){
        if (val.query.id) {
          this.teamId = val.query.id
          this._getTeamDetail(this.teamId)
          this._getMonthListByTeam()
          this._getNbaTeamPlayer(this.teamId)
        }
      }
    },
    mounted(){
      this._getTeamDetail(this.$router.currentRoute.query.id)
      this.teamId = this.$router.currentRoute.query.id
      this.month = new Date().getMonth() + 1
      this.initMotnth = this.month
    }
  }
</script>

<style scoped>
  .player-list ul li{
    width: 33.3%;
    float: left;
  }
  .player-list ul li .player-box{
    padding: 0.1rem 0.1rem;
  }
  .player-list ul li .player-box .position{
    color: #8e8b8b;
    font-size: 12px;
  }
  .player-list ul li .player-box p{
    height: 0.16rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .player-list ul li .player-box .img-box{
    width: 100%;
  }
  .player-list ul li .player-box .img-box img{
    width: 100%;
  }
  .all-player{
    line-height: 0.4rem;
    text-indent: 0.2rem;
    background: #f1f3fa;

  }
  .lineup{
    color: #666;
  }
  .rank-container li{
    padding: 0 0.14rem;
    background: #f1f3fa;
  }
  .rank-item{
    display: flex;
    line-height: 0.4rem;
  }
  .rank-item i{
    display: inline-block;
    width: 20px;
    height: 20px;
  }
  .rank-item .name{
    width: 70%;
  }
  .rank-item .count{
    text-align: right;
    width: 22%;
  }
  .rank-box{
    color: #666;
  }
  .rank-box .rank-title{
    border-top: .01rem solid #e8e8e8;
    border-bottom: .01rem solid #e8e8e8;
    line-height: 0.6rem;
    padding: 0 0.14rem;
    margin-top: 0.1rem;
  }
  .rank-box .rank-title strong{
    font-size: 16px;
  }
  .rank-box .rank-title span{
    float: right;
  }
  table{
    color: #666;
    text-align: center;
    margin-top: 0.1rem;
    background: #F4F4F7;
  }
  thead{
    line-height: 0.24rem;
    background: #ededed;
  }
  tbody tr{
    line-height: 0.3rem;
  }
  tbody .first-tr{
    background: #f9f9f9;
  }
  thead,tbody{
    border-bottom: .01rem solid #e8e8e8;
  }
  .team-honor {
    display: flex;
    height: 0.9rem;
    text-align: center;
    border-top: .01rem solid #DCDDE1;
    border-bottom: .01rem solid #DCDDE1;
    background: #F4F4F7;
    color: #666;
  }

  .team-honor .item {
    width: 33.2%;
    border-right: 1px solid #DCDDE1;

  }

  .team-honor .item p {
    margin-top: 0.56rem;
  }

  .team-honor .no-border {
    border: 0;
  }

  .schedule {
    background: #f1f3fa;
    min-height: 3.8rem;
  }

  .match-list {
    color: #666;
  }

  .no-game {
    width: 100%;
    line-height: 1rem;
    text-align: center;
    background: #fff;
    color: #777;
  }

  .month-tab ul {
    display: flex;
    line-height: 0.3rem;
    color: #333;
  }

  .month-tab ul li {
    width: 12.5%;
    text-align: center;
  }

  .month-tab ul .active {
    color: #ff6633;
  }

  .nba-wrapper .wrapper {
    max-height: 3rem;
  }

  .logo {
    transform-origin: center center;
  }

  .news-item {
    display: flex;
    padding: 0.1rem 0;
  }

  .news-title {
    width: 63%;
    max-height: 2%;
    color: #333;
  }

  .img-box {
    width: 35%;
    height: 0.82rem;
    overflow: hidden;
  }

  .img-box img {
    width: 100%;
    height: 100%;
  }

  .news-list {
    padding: 0 0.1rem;
  }

  .tab ul {
    display: flex;
  }

  .tab ul li {
    width: 25%;
    text-align: center;
    line-height: 0.4rem;
    font-size: 16px;
    color: #666;
  }

  .tab ul .active {
    color: #ff6633;
  }

  .team-wrapper {
    color: #fff;
  }

  .team-card {
    height: 150px;
    position: relative;
  }

  .team {
    display: flex;
    height: 100%;
  }

  .last {
    text-align: right;
  }

  .team .item {
    width: 32%;
    padding: 0 3%;
  }

  .team .item .team-name {
    margin-top: 60px;
  }

  .team .item-center {
    width: 30%;
    text-align: center;
  }

  .team .item-center img {
    width: 70%;
    margin-top: 40px;
  }
</style>
