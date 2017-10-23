<template>
  <div class="match-list">
    <div class="match-wrapper scale-1px" v-for="(item,index) in list">
      <div class="match-item">
        <div class="team">
          <!--<img :src="item.visitteamlogo">-->
          <img :src="item.visitteamlogo==''?'//y.gtimg.cn/mediastyle/yqq/extra/player_cover.png?max_age=31536000':item.visitteamlogo"  onerror="this.src='//y.gtimg.cn/mediastyle/yqq/extra/player_cover.png?max_age=31536000';this.onerror=null;">

          <div class="team-info">
            <strong>{{item.visitscore==0?'- -':item.visitscore}}</strong>
            <p>{{item.visitteamname}}</p>
          </div>
        </div>
        <div class="time"><span v-if="showDay">{{item.date | formatDate}}</span> {{item.time}}</div>
        <div class="team">
          <div class="team-info">
            <strong>{{item.homescore==0?'- -':item.homescore}}</strong>
            <p>{{item.hometeamname}}</p>
          </div>
          <img :src="item.hometeamlogo==''?'//y.gtimg.cn/mediastyle/yqq/extra/player_cover.png?max_age=31536000':item.hometeamlogo"  onerror="this.src='//y.gtimg.cn/mediastyle/yqq/extra/player_cover.png?max_age=31536000';this.onerror=null;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
      props:{
        list:{
          type:Array,
          default:[]
        },
        showDay:{
          type:Boolean,
          default:false
        }
      },
      filters:{
          formatDate(val){
              return parseInt(val)+'日'
          }
      }
  }
</script>

<style scoped>
  .team-info{
    width: 1.1rem;
    text-align: center;
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
</style>
