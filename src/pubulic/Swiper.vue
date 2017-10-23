<template>
    <div class="imgs-wrapper" ref="wrapper">
      <ul>
        <li v-for="(item,index) in imglist" :style="{ transform: 'translate('+(index>0?1:0) * screenWidth+'px)' }" ref="imgList" >
          <div class="img-container"  @touchstart="startFn" @touchmove="moveFn" @touchend="endFn">
            <div class="u-img">
              <img v-lazy="item.picUrl" />
            </div>
          </div>
        </li>
      </ul>
      <div class="dot-wrapper" v-if="hasDot">
        <div>
          <span v-for="(item,index) in imglist" :class="{'active':index==activeIndex-1}"></span>
        </div>
      </div>
    </div>
</template>

<script>
  import {prefixStyle} from '../assets/js/dom'
  const transform = prefixStyle('transform')
  export default{
    props:{
      imglist:{
        type:Array,
        default:function () {
          return []
        }
      },
      isLoop:{
        type:Boolean,
        default:false
      },
      autoPlay:{
        type:Boolean,
        default:false
      },
      duration:{
        type:Number,
        default:3000
      },
      distance:{
        type:Number,
        default:100
      },
      hasDot:{
        type:Boolean,
        default:true
      }
    },
    data(){
      return {
        screenWidth:'',
        activeIndex:1,
        domLi:"",
        domPrevLi:"",
        domNextLi:"",
        touch:{}
      }
    },
    methods:{
      startFn(e){
        if(this.interval){
          window.clearInterval(this.interval)
        }
        if(!this.isScale){
          this.touch.isStart=true
        }
        this.domLi=null
        this.touch.startX=e.touches[0].clientX
        this.domLi=e.target.parentNode.parentNode.parentNode

//        console.log(this.domLi)
        this.domLi.style.opacity="1"
        this.domPrevLi=this.domLi.previousSibling
        this.domNextLi=this.domLi.nextSibling
        if(this.domPrevLi){
          this.domPrevLi.style.transition=''
          this.domPrevLi.style.opacity="1"
        }
        if(this.domNextLi){
          this.domNextLi.style.transition=''
          this.domNextLi.style.opacity="1"
        }
        this.domLi.style.transition=''
        this.len=this.imglist.length
      },
      moveFn(e){
        if(this.touch.isStart){
          this.disX=e.touches[0].clientX-this.touch.startX
          this.domLi.style[transform]=`translate(${this.disX}px,0px)`

          if(this.domPrevLi){
            this.domPrevLi.style[transform]=`translate(${this.disX-this.screenWidth}px,0px)`
          }

          if(this.activeIndex==1&&this.isLoop){
            this.$refs.imgList[this.len-1].style.opacity="1"
            this.$refs.imgList[this.len-1].style.transition=""
            this.$refs.imgList[this.len-1].style[transform]=`translate(${this.disX-this.screenWidth}px,0px)`
          }
          if(this.activeIndex==this.len&&this.isLoop){
            this.$refs.imgList[0].style.opacity="1"
            this.$refs.imgList[0].style.transition=""
            this.$refs.imgList[0].style[transform]=`translate(${this.disX+this.screenWidth}px,0px)`
          }
          if(this.domNextLi){
            this.domNextLi.style[transform]=`translate(${this.disX+this.screenWidth}px,0px)`
          }
        }
      },
      endFn(e){
        if(this.autoPlay){
          this.autoPlayFn()
        }
        if(!this.disX){
            return
        }
        this.touch.isStart=false
        this.domLi.style.transition='all .3s'
        if(this.domPrevLi){
          this.domPrevLi.style.transition='all .3s'
        }
        if(this.domNextLi){
          this.domNextLi.style.transition='all .3s'
        }
        if(this.disX>this.distance&&this.activeIndex==1){
          if(this.isLoop){
            this.domLi.style[transform]=`translate(${this.screenWidth}px,0px)`
            this.domLi.style.opacity=""
            this.domNextLi.style[transform]=`translate(${this.screenWidth}px,0px)`
            this.domNextLi.style.opacity='0'
            this.$refs.imgList[this.len-1].style.transition="all .3s"
            this.$refs.imgList[this.len-1].style[transform]="translate(0px,0px)"
            this.activeIndex=this.len
          }else{
            this.domLi.style[transform]="translate(0px,0px)"
          }
        }else if(this.disX<-this.distance&&this.activeIndex<this.len){
          if(this.domPrevLi){
            this.domPrevLi.style.opacity='0'
            this.domPrevLi.style[transform]=`translate(${this.screenWidth}px,0px)`
          }
          this.domLi.style[transform]=`translate(${-this.screenWidth}px,0px)`
          this.domLi.style.opacity="0"
          this.domNextLi.style[transform]="translate(0px,0px)"
          this.activeIndex++
        }else if(this.disX>this.distance){
          if(this.domPrevLi){
            this.domPrevLi.style[transform]="translate(0px,0px)"
          }
          if(this.domLi){
            this.domLi.style[transform]=`translate(${this.screenWidth}px,0px)`
            this.domLi.style.opacity='0'
          }
          if(this.domNextLi){
            this.domNextLi.style.opacity='0'
          }
          this.activeIndex--
        }else if(this.activeIndex==this.imglist.length && this.disX<-this.distance){
          if(this.isLoop){
            if(this.domPrevLi){
              this.domPrevLi.style[transform]=`translate(${-this.screenWidth}px,0px)`
            }
            this.domLi.style[transform]=`translate(-${this.screenWidth}px,0px)`
            this.$refs.imgList[0].style.transition='all .3s'
            this.$refs.imgList[0].style[transform]="translate(0px,0px)"
            if(this.domNextLi){
              this.domNextLi.style[transform]=`translate(${this.screenWidth}px,0px)`
            }
            this.activeIndex=1
          }else{
            this.domLi.style[transform]="translate(0px,0px)"
          }
        } else{
          if(this.domPrevLi){
            this.domPrevLi.style[transform]=`translate(${-this.screenWidth}px,0px)`
          }
          if(this.activeIndex==this.len){
            this.$refs.imgList[0].style.transition='all .3s'
            this.$refs.imgList[0].style[transform]=`translate(${this.screenWidth}px,0px)`
          }
          if(this.activeIndex==1){
            this.$refs.imgList[this.len-1].style.transition='all .3s'
            this.$refs.imgList[this.len-1].style[transform]=`translate(-${this.screenWidth}px,0px)`
          }
          this.domLi.style[transform]="translate(0px,0px)"
          if(this.domNextLi){
            this.domNextLi.style[transform]=`translate(${this.screenWidth}px,0px)`
          }
        }
        this.disX=0
        this.$emit("changeFn",this.activeIndex)
      },
      autoPlayFn(){
        this.interval=setInterval(()=>{
          if(this.activeIndex>=this.imglist.length){
            if(!this.isLoop){
              window.clearInterval(this.interval)
              return
            }
            this.activeIndex=0
          }
          if(this.activeIndex==this.imglist.length-1){
            if(this.$refs.imgList[0]){
              this.$refs.imgList[0].style[transform]=`translate(${this.screenWidth}px,0px)`
            }
          }
          if(this.$refs.imgList[this.activeIndex]){
            this.$refs.imgList[this.activeIndex].style[transform]="translate(0px,0px)"
            this.$refs.imgList[this.activeIndex].style.opacity="1"
            this.$refs.imgList[this.activeIndex].style.transition="all .3s"
          }

          if(this.$refs.imgList[this.activeIndex-1]){
            this.$refs.imgList[this.activeIndex-1].style[transform]=`translate(-${this.screenWidth}px,0px)`
            this.$refs.imgList[this.activeIndex-1].style.transition="all .3s"
          }

          this.activeIndex++
          if(this.activeIndex==1){
            for(var i=0;i<this.$refs.imgList.length;i++){
              this.$refs.imgList[i].style[transform]=`translate(${this.screenWidth}px,0px)`
              this.$refs.imgList[i].style.transition=""
            }
            this.$refs.imgList[this.$refs.imgList.length-1].style[transform]=`translate(-${this.screenWidth}px,0px)`
            setTimeout(()=>{
              if(this.$refs.imgList[this.$refs.imgList.length-1]){
                this.$refs.imgList[this.$refs.imgList.length-1].style.transition=""
                this.$refs.imgList[this.$refs.imgList.length-1].style[transform]=`translate(${this.screenWidth}px,0px)`
              }
            },100)
            this.$refs.imgList[this.$refs.imgList.length-1].style.transition="all .3s"
            this.$refs.imgList[0].style[transform]="translate(0px,0px)"
            this.$refs.imgList[0].style.transition="all .3s"
          }
        },this.duration)
        if(this.$refs.imgList){
          for(var i=0;i<this.$refs.imgList.length;i++){
            if(this.activeIndex-1==i){
              this.$refs.imgList[i].style[transform]="translate(0px,0px)"
            }else{
              this.$refs.imgList[i].style[transform]=`translate(${this.screenWidth}px,0px)`
            }
          }
        }
      }
    },
    computed:{

    },
    mounted(){
      this.screenWidth=window.screen.width
      if(this.autoPlay){
        this.autoPlayFn()
      }
    }
  }
</script>

<style scoped>
  .dot-wrapper{
    width: 100%;
    position: absolute;
    bottom: 0rem;
    text-align: center;
  }

  .dot-wrapper span{
    display: inline-block;
    width: 0.08rem;
    height: 0.08rem;
    margin-right: 0.04rem;
    border-radius: 50%;
    background: #ccc;
  }
  .dot-wrapper .active{
    background: #ff6633;
  }
  .imgs-wrapper{
    position: relative;
    width: 100%;
    height: 1.5rem;
    overflow:hidden;
    left: 0;
    background: #f5f5f5;
  }
  .imgs-wrapper ul{
    width: 100%;
  }
  .imgs-wrapper li{
    width: 100%;
    height: 100%;
    position: absolute;
    background: #f5f5f5;
    transition: background .3s;
    left:0;
    top: 0;
  }
  .imgs-wrapper li img{
    width: 100%;
  }
</style>
