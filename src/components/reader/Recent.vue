<template>
  <div class="recent" @touchstart="startFn" @touchmove="moveFn" @touchend="endFn" ref="recent">
    <div class="recent-title">
      最近阅读<span v-if="recentList.length>0" @click.stop="showConfirm"><i class="del"></i>清空</span>
    </div>
    <bscroll :data="recentList" :probeType="3"  :pullup="true" :listen-scroll="true"   ref="scroll">
      <div class="recent-wrapper">
        <ul>
          <!--<transition-group name="slide-up">-->
            <li v-for="(item,index) in recentList" class="scale-1px" @click="toRead(item)" :key="item.name"
                @touchstart="itemStart($event,index)" @touchmove="itemMove($event,index)" @touchend="itemEnd($event,index)" ref="domlis">
              <!--<router-link :to="{path:'/reader/reading',query:{book:item.id}}">-->
              <div class="img-box">
                <img :src="item.imgurl">
              </div>
              <div class="recent-info">
                <h3>
                  {{item.name}} <span class="continue-read">继续阅读</span>
                </h3>
                <p>
                  {{item.readTime | lastTime}}
                  <!--<span class="remove-read" @click.stop="removeItem(index)">删除</span>-->
                </p>
              </div>
              <div class="remove" @click.stop="removeItem(index)">
                删除
              </div>
              <!--</router-link>-->
            </li>
          <!--</transition-group>-->
        </ul>
        <div class="no-recent" v-if="recentList.length==0">暂无最近阅读！</div>
      </div>
    </bscroll>
    <div class="book-shelf">
      <span @click.stop="toBookshelf">我的书架</span>
    </div>
  </div>
</template>

<script>
  import Bscroll from '../../pubulic/Bscroll.vue'
  import {lastTime} from '../../filters/filters'
  import {mapMutations} from 'vuex'
  import {prefixStyle} from '../../assets/js/dom'
  import {getSlideDirection} from '../../assets/js/slideDirection'
  const transform = prefixStyle('transform')
  export default{
    props:{
      recentList:{
        default:null,
        type:Array
      },
      threshold:{
        default:50,
        type:Number
      }
    },
    data(){
      return {
        touch:{},
        itemTouch:{},
        confirmShow:false
      }
    },
    methods:{
      ...mapMutations([
          'setContinue'
      ]),
      toBookshelf(){
        this.$emit('hideRecent')
        this.$router.push({
          path:"/reader/bookshelf"
        })
      },
      showConfirm(){
        this.$comfirm('确认删除吗?',()=>{
            this.$emit('clearRecent')
        })
      },
      removeItem(index){
        this.$emit('removeItem',index)
      },
      toRead(item){
        this.setContinue(true)
        this.$emit('hideRecent')
        this.$router.push({
          path:'/reader/reading',
          query:{
              book:item.id
          }
        })
      },
      itemStart(e,index){
        this.$refs.domlis[index].style.transition="none"
        if(this.lastIndex==index){
          this.$refs.domlis[index].style.transition="all .3s"
        }
        this.$refs.domlis.forEach((item,idx)=>{
            if(idx!=index){
              item.style[transform]="translate(0px,0px)"
            }
        })
        this.itemTouch.isStart=true
        this.itemTouch.startX=e.touches[0].clientX
        this.itemTouch.startY=e.touches[0].clientY
      },
      itemMove(e,index){
        if(this.itemTouch.isStart ){
           var moveX= e.touches[0].clientX
           var moveY=e.touches[0].clientY
          if(getSlideDirection(this.itemTouch.startX, this.itemTouch.startY,moveX, moveY)==1 || getSlideDirection(this.itemTouch.startX, this.itemTouch.startY,moveX, moveY)==2){
            return false
          }
          this.itemTouch.disX=moveX-this.itemTouch.startX
          if(this.itemTouch.disX>20){
            return
          }
          if(this.itemTouch.disX<-80){
            this.itemTouch.disX=-80
          }
          this.$refs.domlis[index].style[transform]=`translate(${this.itemTouch.disX}px,0px)`
        }
      },
      itemEnd(e,index){
        this.$refs.domlis[index].style.transition="all .3s"
        if(this.itemTouch.disX<-30){
          this.$refs.domlis[index].style[transform]="translate(-80px,0px)"
          this.lastIndex=index
        }else{
          this.$refs.domlis[index].style[transform]="translate(0px,0px)"
          this.lastIndex=-1
        }
      },
      startFn(e){
        this.touch.isStart=true
        this.touch.startX=e.touches[0].clientX
        this.touch.startY=e.touches[0].clientY
        if(this.$refs.recent){
          this.$refs.recent.style.transition="none"
        }
      },
      moveFn(e){
        if(this.touch.isStart){
          var moveX= e.touches[0].clientX
          var moveY=e.touches[0].clientY
          if(getSlideDirection(this.touch.startX, this.touch.startY,moveX, moveY)==1 || getSlideDirection(this.touch.startX, this.touch.startY,moveX, moveY)==2){
            return false
          }
          this.disX=moveX-this.touch.startX
          if(this.disX<0){
              return
          }
          this.$refs.recent.style[transform]=`translate(${this.disX}px,0px)`
        }
      },
      endFn(){
        this.$refs.recent.style.transition="all .3s"
        if(this.disX>this.threshold){
          this.$refs.recent.style[transform]="translate(100%,0px)"
          setTimeout(()=>{
            this.$emit('hideRecent')
          },10)
        }else{
          this.$refs.recent.style[transform]="translate(0px,0px)"
        }
        setTimeout(()=>{
          if(this.$refs.recent){
            this.$refs.recent.style=''
          }
        },100)
        this.touch.isStart=false
      }
    },
    filters:{
      lastTime
    },
    mounted(){

    },
    components:{
      Bscroll
    }
  }
</script>

<style lang="less" type="text/less">
  .book-shelf{
    text-align: center;
    position: absolute;
    bottom: 0.2rem;
    left: 50%;
    margin-left: -25%;
    span{
      display: inline-block;
      width: 1.4rem;
      height: 0.3rem;
      line-height: 0.3rem;
      border-radius: 0.15rem;
      background: #ff4949;
      color: #fff;
    }
  }
  .recent-wrapper{
    padding: 0 0.1rem;
    overflow: hidden;
    .no-recent{
      text-align: center;
      color: #666;
      font-size: 0.14rem;
      line-height: 1rem;
    }
    li{
      padding:0.02rem 0 0.06rem 0;
      height: 0.6rem;
      position: relative;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: flex;
      .remove{
        position: absolute;
        right: -92px;
        top:0;
        background: rgba(255,0,0,0.8);
        color: #fff;
        height: 100%;
        line-height: 500%;
        width: 80px;
        text-align: center;
      }
      .img-box{
        width: 0.4rem;
        padding: 0.02rem;
        background: none;
        overflow: hidden;
        margin-right: 0.1rem;
        img{
          height: 90%;
          margin-top: 0.04rem;
          box-shadow: 0 1px 3px rgba(0,0,0,.3)
        }
      }
      .recent-info{
        flex: auto;
        h3{
          margin: 0.05rem 0 0.14rem 0;
        }
        .continue-read{
          float: right;
          font-weight: normal;
          font-size: 0.12rem;
          color: #777;
        }
      }
      p{
        font-size: 0.12rem;
        color: #999;
        .remove-read{
          float: right;
          color: #ff4949;
          display: inline-block;
          padding: 0.06rem 0.12rem;
          margin-top: -0.04rem;
        }
      }
    }
    .active{
      color: #f63;
    }
  }
  .recent{
    position: fixed;
    z-index: 1002;
    right: 0;
    top:0;
    width: 85%;
    height: 100%;
    background: #fff;
    .wrapper{
      /*overflow: hidden;*/
      margin-bottom: 0.1rem;
    }
    .recent-title{
      height: 0.4rem;
      line-height: 0.4rem;
      text-align: center;
      border-bottom: 1px solid #666666;
      color: #fff;
      position: relative;
      z-index: 100;
      background: -webkit-linear-gradient(60deg,#737373,#333,#666);
      span{
        position: absolute;
        right: 0rem;
        font-size: 0.12rem;
        padding: 0 0.14rem 0 0.16rem;
        i{
          width: 18px;
          height: 18px;
          display: inline-block;
          background: url("../../assets/img/del.png");
          background-size: contain;
          position: absolute;
          top:0.12rem;
          left: 0rem;
        }
      }
      .chapter-num{
        position: absolute;
        left: 0.1rem;
      }
    }
  }
</style>
