<template>
  <div class="top-nav-pannel progress-container"  >
    <div class="pro-info">
      <P @click="prevChapter">上一章</P>
      <div>
        <h4>{{chapterArr[progressVal]}}</h4>
        <h5>{{parseFloat(progressVal/chapterArr.length*100).toFixed(1)}}%</h5>
      </div>
      <P @click="nextChapter">下一章</P>
    </div>
    <mt-range
      ref="range"
      v-model="progressVal"
      :min="0"
      :max="chapterArr.length-1"
      :step="1"
      :bar-height="2">
    </mt-range>
  </div>
</template>
<script type="text/ecmascript-6">
  import {mapState,mapMutations} from 'vuex'
  export default {
    props:{
        chapterArr:{
            type:Array,
            default:null
        },
        chapterId:{
          default:10,
          type:Number
        }
    },
    computed: {

    },
    data(){
      return {
        progressVal:0
      }
    },
    methods: {
      ...mapMutations([
        'setBgColor'
      ]),
      prevChapter(){
        if(this.progressVal<1){
            return
        }
        this.progressVal--
      },
      nextChapter(){
        if(this.progressVal>=this.chapterArr.length-1){
            return
        }
        this.progressVal++
      }
    },
    watch:{
      progressVal(val){
        if(val<0){
            return
        }
        this.$emit('rangePro',val+1)
      },
      chapterId(val){
        this.progressVal=val
      }
    },
    mounted(){
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.progressVal=this.chapterId
        },100)
      })
      if(this.$refs.range.$el){
        this.$refs.range.$el.addEventListener('drag',function(e){
          e.stopPropagation();
        })
      }
    }
  }
</script>

<style lang="less" type="text/less">

  .progress-container {
    position: fixed;
    bottom:  0.5rem;
    height: 135px;
    background: none;
    width: 100%;
    color: #fff;
    font-size: 14px;
    background: -webkit-linear-gradient(60deg,#737373,#333,#666);
    z-index: 9;
    .pro-info{
      display: flex;
      height: 0.4rem;
      line-height: 0.4rem;
      margin: 0.1rem 0;
      p{
        width: 15%;
        text-align: center;
      }
      div{
        width: 70%;
        text-align: center;
        h4{
          height: 50%;
          line-height: 140%;
          font-weight: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0.04rem 0;
        }
        h5{
          height: 50%;
          line-height: 100%;
          font-weight: normal;
          font-size: 0.12rem;
        }
      }
    }
    .mt-range{
      padding: 0.1rem;
    }
  }
</style>
