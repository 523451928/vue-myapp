<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from "better-scroll"
  export default {
    props: {
      bounce:{
        type:Boolean,
        default:true
      },
      eventPassthrough:{
        type:String,
        default:""
      },
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      scrollX:{
        type: Boolean,
        default:false
      },
      scrollY:{
        type: Boolean,
        default:true
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 400)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX:this.scrollX,
          eventPassthrough:this.eventPassthrough,
          bounce:this.bounce
        })
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos,this.scroll.maxScrollY)
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo(x,y,time,type) {
//        setTimeout(()=>{
//          if(this.$refs.wrapper.getElementsByClassName('list-scroll')[0]){
//            this.$refs.wrapper.getElementsByClassName('list-scroll')[0].style=`transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1); transition-duration: ${time}; transform: translate(0px, ${y}) translateZ(0px);`
//          }
//        },10)
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        this.$emit('scroll', {x:0,y:0})
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data(val) {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style>
  .wrapper{
    max-height: 5rem;
    margin-bottom: .5rem;
  }
  .list .wrapper{
    max-height: 100%;
  }
</style>
