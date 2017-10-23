<template>
  <transition name="slide">
    <div class="imginfo-wrapper">
      <transition name="slide-up">
        <v-head :msg="titleMsg" @back="back" v-show="!bgShow"></v-head>
      </transition>
      <div class="imgs-wrapper" ref="wrapper" :class="{'black':bgShow}">
        <ul>
          <li v-for="(item,index) in imgData.imglist" :style="{ transform: 'translate('+(index>0?1:0) * screenWidth+'px)' }" ref="imgList" >
            <div class="img-container"  @touchstart="startFn" @touchmove="moveFn" @touchend="endFn">
              <div class="u-img" @click="toggleBg">
                <!--<img v-lazy="item.img" @touchstart="imgStartFn" @touchmove="imgMoveFn" @touchend="imgEndFn" />-->
                <img v-lazy="item.img" />
              </div>
            </div>
          </li>
        </ul>
      </div>
      <transition name="slide-down">
        <div class="img-text-wrapper" v-show="!bgShow">
          <div>{{imgData.imglist?imgData.imglist[activeIndex-1].desc:''}}</div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
  import VHead from "../../../pubulic/Head.vue"
  import {getImgInfo} from "../../../api/api"
  import {prefixStyle} from '../../../assets/js/dom'
  const transform = prefixStyle('transform')
  const transformOrigin= prefixStyle('transformOrigin')
  export default{
    props:{
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
      }
    },
    data(){
      return {
        screenWidth:'',
        activeIndex:1,
        imgData:{},
        domLi:"",
        domPrevLi:"",
        domNextLi:"",
        touch:{},
        bgShow:false,
        clickNum:0,
        isScale:false,
        imgTouch:{}
      }
    },
    methods:{
      back(){
        this.$router.back()
      },
      toggleBg(e){
        this.clickNum++
        if(this.clickNum<2){
          setTimeout(()=>{
            if(this.clickNum<2){
              this.bgShow=!this.bgShow
              this.clickNum=0
            }
          },200)
        }else{
          e.target.parentNode.style.transition="all .3s"
          e.target.parentNode.style[transformOrigin]="0% 0%"
          if(!this.isScale){
            e.target.parentNode.style[transform]=`scale(2) translate(-${e.offsetX/2}px,-${e.offsetY/2}px)`
          }else{
            e.target.parentNode.style[transform]="scale(1) translate(0px,0px)"
          }
          this.isScale=!this.isScale
          this.imgTouch.startX=e.offsetX/2
          setTimeout(()=>{
            this.clickNum=0
            e.target.parentNode.style.transition=""
          },500)
        }
      },
      imgStartFn(e){
        if(this.isScale){
          this.imgTouch.imgIsStart=true
        }
        this.imgTouch.imgStartX=e.touches[0].clientX
      },
      imgMoveFn(e){
        if(this.imgTouch.imgIsStart){
          this.imgdisX=e.touches[0].clientX-this.imgTouch.imgStartX
          if(this.imgdisX-this.imgTouch.startX>0){
            this.imgdisX=this.imgTouch.startX
          }else if(this.imgdisX<-this.screenWidth/2+this.imgTouch.startX){
            this.imgdisX=-this.screenWidth/2+this.imgTouch.startX
          }
          e.target.style[transform]=`translate(${this.imgdisX}px,0px)`
        }
      },
      imgEndFn(){
        this.touch.imgIsStart=false
      },
      startFn(e){
        if(this.interval){
          window.clearInterval(this.interval)
        }
        if(!this.isScale){
          this.touch.isStart=true
        }
        this.touch.startX=e.touches[0].clientX
        this.domLi=e.target.parentNode.parentNode.parentNode
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
        this.len=this.imgData.imglist.length
      },
      moveFn(e){
        if(this.touch.isStart){
          this.disX=e.touches[0].clientX-this.touch.startX
          this.domLi.style[transform]=`translate(${this.disX}px,0px)`

          if(this.domPrevLi){
            this.domPrevLi.style[transform]=`translate(${this.disX-this.screenWidth}px,0px)`
          }
          if(this.domNextLi){
            this.domNextLi.style[transform]=`translate(${this.disX+this.screenWidth}px,0px)`
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
        }
      },
      endFn(e){
        if(this.autoPlay){
          this.autoPlayFn()
        }
        this.touch.isStart=false
        this.domLi.style.transition='all .3s'
        if(this.domPrevLi){
          this.domPrevLi.style.transition='all .3s'
        }
        if(this.domNextLi){
          this.domNextLi.style.transition='all .3s'
        }
        if(this.disX>100&&this.activeIndex==1){
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
        }else if(this.disX<-100&&this.activeIndex<this.len){
          if(this.domPrevLi){
            this.domPrevLi.style.opacity='0'
          }
          this.domLi.style[transform]=`translate(${-this.screenWidth}px,0px)`
          this.domLi.style.opacity="0"
          this.domNextLi.style[transform]="translate(0px,0px)"
          this.activeIndex++
        }else if(this.disX>100){
          this.domPrevLi.style[transform]="translate(0px,0px)"
          this.domLi.style[transform]=`translate(${this.screenWidth}px,0px)`
          this.domLi.style.opacity='0'
          if(this.domNextLi){
            this.domNextLi.style.opacity='0'
          }
          this.activeIndex--
        }else if(this.activeIndex==this.imgData.imglist.length && this.disX<-100){
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
//            this.$refs.imgList[this.len-1].style[transform]=`translate(-${this.screenWidth}px,0px)`
          }
          this.domLi.style[transform]="translate(0px,0px)"
          if(this.domNextLi){
            this.domNextLi.style[transform]=`translate(${this.screenWidth}px,0px)`
          }
        }
        this.disX=0
      },
      autoPlayFn(){
        this.interval=setInterval(()=>{
          if(this.activeIndex>=this.imgData.imglist.length){
            if(!this.isLoop){
              window.clearInterval(this.interval)
              return
            }
            this.activeIndex=0
            for(var i=0;i<this.$refs.imgList.length;i++){
              this.$refs.imgList[i].style[transform]=`translate(${this.screenWidth}px,0px)`
            }
            this.$refs.imgList[this.imgData.imglist.length-1].style[transform]=`translate(-${this.screenWidth}px,0px)`
            this.$refs.imgList[this.imgData.imglist.length-1].style.transition="all .3s"
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
        },this.duration)
      }
    },
    computed:{
      titleMsg(){
        if(this.imgData.imglist){
          return this.activeIndex+'/'+ this.imgData.imglist.length
        }
      }
    },
    mounted(){
      getImgInfo(this.$router.currentRoute.params.id).then((res)=>{
        this.imgData=res["photo_info"].data.item
      })
      this.screenWidth=window.screen.width
      if(this.autoPlay){
          this.autoPlayFn()
      }
    },
    components:{
      VHead
    }
  }
</script>

<style scoped>
  .img-text-wrapper{
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    background: rgba(240,240,240,.8);
  }
  .img-text-wrapper div{
    padding: .1rem .1rem .1rem;
  }
  .imgs-wrapper{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    background: #f5f5f5;
  }
  .imgs-wrapper ul{
    width: 100%;
  }
  .imgs-wrapper li{
    height: 100%;
    display:-webkit-box;
    -webkit-box-pack:center;
    -webkit-box-align:center;
    position: absolute;
    background: #f5f5f5;
    transition: background .3s;
    left:0;
    top: 0;
  }
  .black, .black li{
    background: #1a1a1a;
  }
  .imgs-wrapper li img{
    width: 100%;
  }
  .imginfo-wrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    background: #fff;
    z-index: 1000;
    color: #666;
  }
</style>
