<template>
  <div class="catalog">
    <div class="catalog-title clearfix">
      <span class="chapter-num">共{{catalogs.length}}章</span>
      目录
      <span class="sort" @click="reverseArr">倒序</span>
    </div>
    <bscroll :data="dataList" v-if="catalogShow" :probeType="3"  :pullup="true" :listen-scroll="true" @scroll="scroll" @scrollToEnd="scrollToEnd" ref="scroll">
      <div class="catalogs-wrapper">
        <ul>
          <li :class="{'active':index==currentIndex}" v-for="(item,index) in dataList" class="scale-1px" @click="changeChapter(index)">
            {{item}}
          </li>
        </ul>
      </div>
    </bscroll>
  </div>
</template>

<script>
  import Bscroll from '../../pubulic/Bscroll.vue'
  export default{
      props:{
        catalogs:{
          default:null,
          type:Array
        },
        catalogShow:{
          default:true,
          type:Boolean
        },
        chapterId:{
          default:0,
          type:Number
        }
      },
      methods:{
        changeChapter(index){
            this.$emit('changeChapter',index)
            this.currentIndex=index+this.spliceNum*this.spliceCount
            this.reverseIndex=this.currentIndex
        },
        reverseArr(){
            this.catalogArr=this.catalogArr.reverse()
            this.reverse=!this.reverse
            if(this.reverse){
              this.currentIndex=this.catalogArr.length-this.currentIndex-1
            }else{
              this.currentIndex=this.reverseIndex
            }
        },
        scroll(pos,maxY){
          if(pos.y>10 && this.spliceCount>0 && !this.cloak){
            this.spliceCount--
            setTimeout(()=>{
              this.$refs.scroll.scrollTo(0,0,maxY)
            },100)
            this.cloak=true
          }
          if(this.timer){
            window.clearTimeout(this.timer)
          }
          this.timer=setTimeout(()=>{
            this.cloak=false
          },100)
        },
        scrollToEnd(){
            if(this.catalogArr.length>this.spliceNum*this.spliceCount){
                this.spliceCount++
                this.$refs.scroll.scrollTo(0,0,0)
            }
        }
      },
      data(){
          return {
            currentIndex:0,
            reverseIndex:0,
            reverse:false,
            catalogArr:[],
            spliceNum:50,
            spliceCount:0,
            cloak:false
          }
      },
      computed:{
          dataList(){
              this.currentIndex=this.spliceNum*this.spliceCount
              return this.catalogArr.slice(this.spliceNum*this.spliceCount,this.spliceNum*this.spliceCount+this.spliceNum)
          }
      },
      watch:{
        chapterId(val){
          this.currentIndex=val
          this.reverseIndex=this.currentIndex
        }
      },
      mounted(){
          this.$nextTick(()=>{
            setTimeout(()=>{
              this.currentIndex=this.chapterId
              this.reverseIndex=this.currentIndex
              this.catalogArr=this.catalogs
            },100)
          })
      },
      components:{
        Bscroll
      }
  }
</script>

<style lang="less" type="text/less">

  .catalogs-wrapper{
    padding: 0 0.1rem;
    li{
      line-height: 0.4rem;
      height: 0.4rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .active{
     // color: #f63;
    }
  }
  .catalog{
    position: fixed;
    z-index: 1002;
    left: 0;
    top:0;
    width: 80%;
    height: 100%;
    background: #fff;
    .catalog-title{
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      border-bottom: 1px solid #666666;
      color: #fff;
      position: relative;
      z-index: 100;
      background: -webkit-linear-gradient(60deg,#737373,#333,#666);
      .chapter-num{
        position: absolute;
        left: 0.1rem;
      }
      .sort{
        position: absolute;
        right: 0rem;
        padding: 0 0.1rem;
      }
    }
  }
</style>
