<template>
  <div class="rank-wrapper">
    <div class="partition">
      <div v-for="(item,index) in partitionArr" :class="{'active':index==activeIndex}" @click="changePart(index)">{{item}}</div>
    </div>
    <bscroll :data="westArr" class="rank-box">
        <table cellspacing="0" cellpadding="0" width="100%" class="rank">
          <thead>
            <tr>
              <th class="first" width="28%">球队</th>
              <th width="18%">胜</th>
              <th width="18%">负</th>
              <th width="18%">胜率</th>
              <th width="18%">场均差</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in list">
              <td class="first" width="28%">
                <span v-if="index<3" :class="{'champion':index==0,'runner':index==1,'third':index==2}"></span>
                <span v-if="index>=3" :class="{'top-eight':index<8}">{{index+1}}</span>{{item.cnshortname}}
              </td>
              <td width="18%">{{item.wins}}</td>
              <td width="18%">{{item.losses}}</td>
              <td width="18%">{{item.winper}}</td>
              <td width="18%">{{item.gamesback}}</td>
            </tr>
          </tbody>
        </table>
    </bscroll>
  </div>
</template>

<script>
  import {getNbaRank} from '../../api/api'
  import Bscroll from "../../pubulic/Bscroll.vue"
  export default{
    data(){
      return {
        rankObj:{},
        westArr:[],
        eastArr:[],
        list:[],
        partitionArr:["西部联盟","东部联盟"],
        activeIndex:0
      }
    },
    methods:{
      changePart(index){
        this.activeIndex=index
        if(index==1){
          this.list=this.eastArr
        }else{
          this.list=this.westArr
        }
      },
      formatData(obj,arr){
        var ret=[]
        for(var i=0;i<arr.length;i++){
          for(var key in obj){
            if(arr[i]==key){
               ret[i]=obj[key]
            }
          }
        }
        return ret
      }
    },
    mounted(){
      this.$loading("加载中...")
      getNbaRank().then((res)=>{
        this.rankObj=res.team_rank
        this.westArr=this.formatData(this.rankObj.team,this.rankObj.w)
        this.eastArr=this.formatData(this.rankObj.team,this.rankObj.e)
        this.list=this.westArr
        this.$loading.close()
      })
    },
    components:{
      Bscroll
    }
  }
</script>

<style scoped>
  .first{
    position: relative;
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
    margin-right: 0.05rem;
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
  table .first{
    text-align: left;
    padding-left: 0.2rem;
  }

  table thead{
    height: 0.3rem;
    line-height: 0.3rem;
    background:#eee;
  }
  .partition{
    display: flex;
    height: 0.36rem;
    line-height: 0.36rem;
  }
  .partition div{
    width: 45%;
    font-size: 16px;
    color: #666;
  }
  .partition :first-child{
    padding-left: 5%;
    text-align: left;
  }
  .partition :last-child{
    text-align: right;
    padding-right: 5%;
  }
  .partition .active{
    color: #ff6633;
  }

</style>
