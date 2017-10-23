<template>
  <transition name="slide">
    <div class="circle-detail">
      <v-head :msg="titleMsg" @back="back"></v-head>
    </div>
  </transition>
</template>

<script>
  import VHead from "../../../pubulic/Head.vue"
  import Bscroll from "../../../pubulic/Bscroll.vue"
  import {getCircleTopInfo} from "../../../api/api"
  export default{
      data(){
          return {
            titleMsg:"圈子"
          }
      },
      methods:{
        back(){
          this.$router.back()
        }
      },
      components:{
        VHead,
        Bscroll
      },
      mounted(){
        getCircleTopInfo(this.$router.currentRoute.params.id).then((res)=>{
            console.log(res)
        })
      }
  }
</script>

<style scoped>
  .circle-detail{
    position: fixed;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    z-index: 100;
    background: #fff;
  }
</style>
