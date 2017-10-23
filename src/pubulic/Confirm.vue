<template>
  <transition name="scale">
    <div class="confirm-wrapper">
        <div class="confirm-box">
            <p>{{title}}</p>
            <div class="btn-wrapper">
              <span class="cancel" @click="cancelFn">取消</span>
              <span class="confirm" @click="confirmFn">确认</span>
            </div>
        </div>
    </div>
  </transition>
</template>

<script>
  export default{
      props:{
          title:{
              type:String,
              default:"确认删除吗?"
          }
      },
      data(){
          return {

          }
      },
      methods:{
        cancelFn(){
          this.$emit('cancelFn')
        },
        confirmFn(){
          this.$emit('confirmFn')
        }
      }
  }
</script>

<style scoped>
  .confirm-wrapper{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left:0;
    background: rgba(0,0,0,.3);
    z-index: 1999;
  }
  .confirm-wrapper .confirm-box{
    width: 2.8rem;
    height: 1rem;
    position: absolute;
    background: #fff;
    top: 50%;
    left: 50%;
    margin-left: -1.4rem;
    margin-top: -0.5rem;
    z-index: 1999;
    border-radius: 4px;
    color: #666666;
  }

  .confirm-box p{
    line-height: 0.62rem;
    text-align: center;
    font-size: 18px;
    border-bottom: 1px solid #ccc;
  }
  .btn-wrapper span{
    display: inline-block;
    width: 49%;
    text-align: center;
    height: 0.37rem;
    line-height: 0.37rem;
  }
  .btn-wrapper .confirm{
    color: #4caf50;
  }
  .btn-wrapper .cancel{
    border-right: 1px solid #ccc;
    color: #ff6633;
  }
  .scale-enter-active,.scale-leave-active,.confirm-box{
    transition: all 0.5s;
  }
  .scale-enter,.scale-leave-to{
    opacity: 0;
  }
  .scale-enter .confirm-box,.scale-leave-to .confirm-box{
    transform: scale(.5);
  }
</style>
