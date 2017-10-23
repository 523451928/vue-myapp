<template>
  <transition name="slide" >
    <div class="celebrity-wrapper">
      <v-head :msg="celebrityData.name" @back="back"></v-head>
      <div class="card clearfix">
        <div class="left">
          <h2>{{celebrityData.name}}-{{celebrityData.name_en}}</h2>
          <p>性别:{{celebrityData.gender}}</p>
          <p>出生地:{{celebrityData.born_place}}</p>
          <p>别名:<span v-for="(item,index) in celebrityData.aka">{{item}} / </span> <span v-for="(item,index) in celebrityData.aka_en">{{item}} / </span></p>
        </div>
        <div class="right">
          <img v-if="celebrityData.avatars" :src="celebrityData.avatars.small">
        </div>
      </div>
      <div class="personal-works">
        <p>个人作品</p>
        <movielist :list="worksList"></movielist>
      </div>
    </div>
  </transition>
</template>

<script>
  import VHead from '../../pubulic/Head.vue'
  import {getStarCelebrity} from '../../api/api'
  import Movielist from './Movielist.vue'
  import Star from '../../pubulic/Star.vue'
  export default{
    data(){
      return {
        celebrityData:{}
      }
    },
    computed:{
      worksList(){
        if(this.celebrityData.works){
          var arr=[]
          this.celebrityData.works.forEach((item)=>{
             arr.push(item.subject)
          })
          return arr
        }
      }
    },
    components:{
      VHead,
      Movielist,
      Star
    },
    methods:{
      back(){
        this.$router.go(-1)
      }
    },
    mounted(){
      this.$loading("加载中...")
      getStarCelebrity(this.$router.currentRoute.query.id).then((res)=>{
        this.celebrityData=res
        this.$loading.close()
      },()=>{
        this.$loading.close()
      })
    }
  }
</script>

<style scoped>
  .personal-works p{
    text-indent: 0.12rem;
  }
  .celebrity-wrapper{
    position: fixed;
    overflow: scroll;
    z-index: 50;
    width: 100%;
    height: 100%;
    background: #fff;
    top:0;
    left: 0;
    z-index: 1000;
  }
  .card{
    margin: 0.2rem 0;
  }
  .card .left{
    width: 66%;
    float: left;
  }
  .card .right{
    width: 32%;
    float: right;
  }
  .card .right img{
    width: 100%;
  }
  .card{
    padding: 0 0.12rem;
    padding-top: 0.5rem;
  }
  .card h2{
    margin: 0px 0 5px;
    font-size: 24px;
    line-height: 32px;
    word-break: break-all;
    font-weight: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #111;
  }
</style>
