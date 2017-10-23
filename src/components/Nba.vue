<template>
  <div class="nba-wrapper">
    <div class="nba-nav ">
      <bscroll :scrollX="true" :data="menu" ref="scroll">
        <div class="clearfix">
          <router-link tag="a"  v-for="(m,index) in menu"  :to="m.path" :key="m.path"  :class="{'router-link-active':$route.path==m.path}">
            {{m.txt}}
          </router-link>
        </div>
      </bscroll>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Bscroll from '../pubulic/Bscroll.vue'
export default {
  name: 'nba',
  data () {
    return {
      eventPassthrough:"",
      menu:[
        {
          path:"/nba/focus",
          txt: "焦点",
        },{
          path:"/nba/image",
          txt: "图片"
        }, {
          path:"/nba/statistics",
          txt: "统计"
        },{
          path:"/nba/warriors?id=9",
          txt: "勇士"
        },{
          path:"/nba/cavaliers?id=5",
          txt: "骑士"
        },{
          path:"/nba/spurs?id=24",
          txt: "马刺"
        }, {
          path:"/nba/rank",
          txt: "排名"
        },{
          path:"/nba/video",
          txt: "视频"
        },{
          path:"/nba/playoff",
          txt: "季后赛"
        },{
          path:"/nba/schedule",
          txt: "赛程"
        },{
          path:"/nba/circle",
          txt: "圈子"
        }
      ]
    }
  },
  methods:{
    scrollTo(index){
      if(index>2){
        this.$refs.scroll.scrollTo(0,`"-${30*(index-3)}px"`,"500ms","ease")
      }
    }
  },
  watch:{
    $route(to,from) {
      if(to.name=="Nba"){
        this.$router.push({path:"/nba/focus"})
      }
    }
  },
  mounted(){
    this.$router.push({path:"/nba/focus"})
  },
  components:{
    Bscroll
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nba-nav{
    position: relative;
    top: 0;
    width: 100%;
    height: 0.42rem;
    z-index: 100;
    left: 0;
    background: #fff;
    text-align: center;
    background: #f5f5f5;
    overflow:hidden ;
  }
  .nba-nav div{
    height: 0.44rem;
    width: auto;
    width: 166%;
  }
  .nba-nav a{
    float: left;
    padding: 0  0.2rem;
    text-decoration: none;
    color: #666;
    line-height: 0.4rem;
    position: relative;
    border-bottom: 2px solid #f5f5f5;
  }
  .nba-nav .router-link-active{
    color: #ff6633;
    border-bottom: 2px solid #ff6633;
  }
</style>
