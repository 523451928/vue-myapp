<template>
  <transition name="slide" >
    <div class="read-detail">
      <v-head :msg="detailObj.category" @back="back"></v-head>
      <div class="read-content" v-html="detailObj.content"></div>
    </div>
  </transition>
</template>

<script>
  import {mapMutations} from 'vuex'
  import VHead from '../../pubulic/Head.vue'
  export default{
    props:['detailObj'],
    data(){
        return {
        }
    },
    methods:{
      ...mapMutations([
          'setMaskShow'
      ]),
      back(){
        this.$emit('hideDetail')
        setTimeout(()=>{
          this.setMaskShow(false)
        },500)
      }
    },
    mounted(){
      var imgs= document.getElementsByTagName("img")
      var as=document.getElementsByTagName('a')
      for(var i=0;i<as.length;i++){
        as[i].onclick=function(e){
          e.stopPropagation()
          e.preventDefault()
        }
      }
      for(var i=0;i<imgs.length;i++){
        imgs[i].style.width="3rem"
      }
    },
    components:{
        VHead
    }
  }
</script>

<style>
  .read-detail{
    position: fixed;
    top:0;
    left: 0;
    height: 100%;
    width: 100%;
    background: #fff;
    z-index: 10;
  }
  .read-detail .read-content{
    padding:0.5rem 0.12rem 0.12rem 0.12rem;
    overflow-y:scroll;
    overflow-x: hidden;
    max-height: 6.2rem;
  }
</style>
