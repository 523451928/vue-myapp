<template>
  <div class="statis-wrapper">
    <div class="catogery-box">
      <ul class="clearfix">
        <li v-for="(item,index) in catogeryArr" :class="{'active':index==activeIndex}" @click="changeCat(index,item)">{{item.text}}</li>
      </ul>
    </div>
    <bscroll :data="list" class="rank-box">
      <table cellspacing="0" cellpadding="0" width="100%" class="rank">
        <thead>
        <tr>
          <th class="first" width="40%">球员</th>
          <th width="30%" v-if="activeCat=='pt'">场均得分</th>
          <th width="30%" v-if="activeCat=='pt'">总得分</th>

          <th width="30%" v-if="activeCat=='rb'">场均篮板</th>
          <th width="30%" v-if="activeCat=='rb'">总篮板</th>

          <th width="30%" v-if="activeCat=='at'">场均助攻</th>
          <th width="30%" v-if="activeCat=='at'">总助攻</th>

          <th width="30%" v-if="activeCat=='st'">场均抢断</th>
          <th width="30%" v-if="activeCat=='st'">总抢断</th>

          <th width="30%" v-if="activeCat=='bk'">场均盖帽</th>
          <th width="30%" v-if="activeCat=='bk'">总盖帽</th>

          <th width="30%" v-if="activeCat=='to'">场均失误</th>
          <th width="30%" v-if="activeCat=='to'">总失误</th>

          <th width="20%" v-if="activeCat=='tp'">命中率</th>
          <th width="20%" v-if="activeCat=='tp'">进球数</th>
          <th width="20%" v-if="activeCat=='tp'">投篮数</th>

          <th width="30%" v-if="activeCat=='fo'">场均犯规</th>
          <th width="30%" v-if="activeCat=='fo'">总犯规</th>

          <th width="20%" v-if="activeCat=='ftp'">命中率</th>
          <th width="20%" v-if="activeCat=='ftp'">进球数</th>
          <th width="20%" v-if="activeCat=='ftp'">罚球数</th>

          <th width="20%" v-if="activeCat=='sht'">命中率</th>
          <th width="20%" v-if="activeCat=='sht'">进球数</th>
          <th width="20%" v-if="activeCat=='sht'">投篮数</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in list">
          <td class="first" width="40%" @click="toPlayer(item)">
            <span v-if="index<3" :class="{'champion':index==0,'runner':index==1,'third':index==2}"></span>
            <span v-if="index>=3" :class="{'top-eight':index<8}">{{index+1}}</span>
            <em :style='`background:url("${item.teamlogo}") ; backgroundPosition:50%;backgroundSize:cover;`' ></em>
            {{item.playername}}
          </td>
          <td width="30%" v-if="activeCat=='pt'||activeCat=='rb'||activeCat=='at'||activeCat=='st'||activeCat=='bk'||activeCat=='to'||activeCat=='fo'">{{item.avgdata}}</td>
          <td width="30%" v-if="activeCat=='pt'||activeCat=='rb'||activeCat=='at'||activeCat=='st'||activeCat=='bk'||activeCat=='to'||activeCat=='fo'">{{item.totaldata}}</td>
          <td width="20%" v-if="activeCat=='tp'||activeCat=='ftp'||activeCat=='sht'">{{item.percentage}}</td>
          <td width="20%" v-if="activeCat=='tp'||activeCat=='ftp'||activeCat=='sht'">{{item.totaldata}}</td>
          <td width="20%" v-if="activeCat=='tp'||activeCat=='ftp'||activeCat=='sht'">{{item.denominator}}</td>
        </tr>
        </tbody>
      </table>
    </bscroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getNbaStatistics} from '../../api/api'
  import Bscroll from "../../pubulic/Bscroll.vue"
  export default{
    data(){
      return {
        playerObj:{},
        catogeryArr:[
          {text:"得分",code:"pt"},
          {text:"篮板",code:"rb"},
          {text:"助攻",code:"at"},
          {text:"抢断",code:"st"},
          {text:"盖帽",code:"bk"},
          {text:"失误",code:"to"},
          {text:"三分",code:"tp"},
          {text:"犯规",code:"fo"},
          {text:"罚球",code:"ftp"},
          {text:"神投",code:"sht"}
        ],
        activeIndex:0,
        activeCat:'pt'
      }
    },
    computed:{
      list(){
        if(this.playerObj[this.activeCat]){
            return this.playerObj[this.activeCat].record
        }
      }
    },
    methods:{
      changeCat(index,item){
        this.activeIndex=index
        this.activeCat=item.code
      },
      toPlayer(item){
        this.$router.push({
          path:`/nba/statistics/${item.playerid}`
        })
      }
    },
    mounted(){
       this.$loading("加载中...")
       getNbaStatistics().then((res)=>{
         this.playerObj=res.player_top2
         this.$loading.close()
       })
    },
    components:{
      Bscroll
    }
  }
</script>

<style scoped>
  .statis-wrapper .wrapper{
    max-height: 4.5rem;
  }
  table .first{
    text-align: left;
    padding-left: 0.12rem;
    position: relative;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .first em{
    width: 0.2rem;
    height: 0.2rem;
    display: inline-block;
    background-position: 50% !important;
    position: relative;
    top:0.04rem;
    background-size: cover !important;
    background-repeat: no-repeat;
  }
  .first span{
    width: 0.18rem;
    height: 0.18rem;
    display: inline-block;
    background: #ccc;
    color: #fff;
    line-height: 0.2rem;
    font-size: 12px;
    text-align: center;
    margin-right: 0rem;
  }
  .first .champion{
    width: 25px;
    height: 24px;
    display: inline-block;
    background: url('../../assets/img/champion.png');
    background-size: cover;
    position: relative;
    top:0.05rem;
    left: -0.02rem;
    margin-right: 0rem;
  }
  .first .runner{
    width: 24px;
    height: 24px;
    display: inline-block;
    background: url('../../assets/img/runner.png');
    background-size: cover;
    position: relative;
    top:0.05rem;
    left: -0.02rem;
    margin-right: 0rem;
  }
  .first .third{
    width: 25px;
    height: 24px;
    display: inline-block;
    background: url('../../assets/img/third.png');
    background-size: cover;
    position: relative;
    top:0.05rem;
    left: -0.02rem;
    margin-right: 0rem;
  }
  .first .top-eight{
    background: #ff6633;
  }
  .rank{
    background: #f1f3fa;
    text-align: center;
  }
  tbody tr{
    height: 0.46rem;
    line-height: 0.46rem;
    position: relative;
  }
  tbody tr td{
    border-bottom: 1px solid #eee;
  }
  .rank th{
    font-size: 14px;
    font-weight: normal;
  }


  table thead{
    height: 0.3rem;
    line-height: 0.3rem;
    background:#eee;
  }
  .catogery-box{
    width: 100%;
    background: #fff;
  }
  .catogery-box li{
    width: 20%;
    float: left;
    text-align: center;
    line-height: 0.38rem;
    color: #666;
  }
  .catogery-box .active{
    color: #ff6633;
  }
</style>
