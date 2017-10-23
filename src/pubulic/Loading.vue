<template>
  <div class="loading">
    <img width="24" height="24" src="../assets/img/loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
  export default{
    props:{
      title:{
        type:String,
        default:'正在加载中...'
      }
    }
  }
</script>

<style>
  .loading{
    display: flex;
    height: 0.3rem;
    text-align: center;
    line-height: 0.3rem;
  }
  .loading img{
    margin:0.02rem 0.02rem 0 1.2rem;
  }
  .loading .desc{
    color: #666;
    margin: -0.01rem;
    font-size: 0.14rem;
  }
</style>
