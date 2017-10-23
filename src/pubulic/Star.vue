<template>
  <div class="star" :class="starType">
    <span v-for="(item,index) in itemClass" :class="item"></span>
    <i class="score" v-show="showScore==true">{{score}}</i>
    <slot></slot>
  </div>
</template>

<script>
  export default{
    props:{
        size:{
            default:'In',
            type:String
        },
        score:{
            default:0,
            type:Number
        },
        showScore:{
            default:true,
            type:Boolean
        },
        scoreType:{
            default:true,
            type:Boolean
        }
    },
    computed: {
      starType(){
        return "type" + this.size;
      },
      itemClass(){
        var result = [];
        if(this.scoreType){
          var score = this.score /2
        }else{
          var score = this.score
        }
        var integer = Math.floor(score);
        var hasHalf = Math.round(score)>integer;
        for (var i = 0; i < integer; i++) {
          result.push("on");
        }
        if (hasHalf) {
          result.push("half");
        }
        while (result.length < 5) {
          result.push("off");
        }
        return result;
      }
    },
    mounted(){

    }
  }
</script>

<style>
  .star span {
    display: inline-block;
  }
  .score{
    font-style: normal;
    color: #777;
    position: relative;
    top: -1px;
    font-size: 12px;
  }
  .star .on{
    background: url("../assets/img/star-on.png") no-repeat;
    background-size: contain;
  }
  .star .half{
    background: url("../assets/img/star-half.png") no-repeat;
    background-size: contain;
  }
  .star .off{
    background: url("../assets/img/star-off.png") no-repeat;
    background-size: contain;
  }
  .typeIn span{
    width: 0.14rem;
    height:0.14rem;
    display: inline-block;
    margin: 2px;
  }
  .typeSmall span{
    width: .1rem;
    height:.1rem;
    display: inline-block;
    margin: 1px;
  }
</style>
