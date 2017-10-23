<template>
  <div class="message-wrapper">
    <i></i><span>{{msg}}</span>
  </div>
</template>

<script>
  export default{
      props:{
        msg:{
          type:String,
          default:"这是一个消息提示"
        },
        msgType:{
          type:String,
          default:"success"
        }
      }
  }
</script>

<style scoped>
  .message-wrapper{
    position: fixed;
    width: 100%;
    top: 0;
    height: 0.44rem;
    line-height: 0.44rem;
    background: #ff6633;
    color: #fff;
    z-index: 1000;
  }
  .message-wrapper i{
    width: 20px;
    height: 20px;
    display: inline-block;
    background: url('../assets/img/success.png');
    background-size: cover;
    position: relative;
    top: 0.05rem;
    margin: 0 0.02rem 0 0.1rem;
  }
</style>
