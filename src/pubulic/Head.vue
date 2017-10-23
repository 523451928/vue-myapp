<template>
  <div class="my-head" :class="{'rotate':isRotate}">
    <div class="back" @click="back">
      <i></i>
    </div>
    {{msg}}
  </div>
</template>

<script>
  export default{
      props:{
        msg:{
          type:String,
          default:"头部"
        },
        isRotate:{
          type:Boolean,
          default:false
        }
      },
      methods:{
        back(){
          this.$emit("back")
        }
      }
  }
</script>

<style>
  .my-head{
    position: fixed;
    height: 0.48rem;
    line-height: 0.48rem;
    text-align: center;
    border-bottom: 1px solid #ccc;
    font-size: 0.16rem;
    background: #fff;
    z-index: 100;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rotate{
    background: none;
    color: #fff;
    border-bottom: none;
  }
  .my-head .back{
    width: 0.48rem;
    height: 0.48rem;
    position: absolute;
    left: 0;
    top:0;
  }
  .my-head .back i{
    margin-top: 0.14rem;
    display: inline-block;
    width: 0.22rem;
    height: 0.22rem;
    background: url("../assets/img/back.png");
    background-size: contain;
  }
  .rotate .back i{
    transform: rotate(-90deg);
    background: url("../assets/img/return.png");
    background-size: contain;
    margin-top: 0.1rem;
  }
</style>
