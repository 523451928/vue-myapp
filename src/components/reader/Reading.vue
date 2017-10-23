<template>
    <div>
      <transition name="slide-up">
        <v-header @back="back" :msg="bookName" v-show="barShow" :class="{'z-bottom':catalogShow}"></v-header>
      </transition>
      <div v-if="readContent.content" class="reading" :class='{"bg-0":bg_color==0,"bg-1":bg_color==1,"bg-2":bg_color==2,"bg-3":bg_color==3,"bg-4":bg_color==4,"bg-5":bg_color==5,"night":isNight}'>
        <h3 :class="{'hasBar-h3':barShow}">{{readContent.title}}</h3>
        <bscroll :data="readContent.content.split('-')" :probeType="3" :pullup="true" :listen-scroll="true" @scroll="scroll" @scrollToEnd="" ref="scroll" >
          <div class="read-container"  @click="toggleBg" :class="{'hasBar':barShow}">
            <div>
              <transition name="slide-up">
                <div v-if="pullUp" class="pull-down">{{pullUpText}}</div>
              </transition>
              <p :style="{'font-size':initSize+'px'}" v-for="(item,index) in readContent.content.split('-')">{{item}}
              <div class="chapter-btn">
                <span @click.stop="prevChapter" :class="{'disabled':chapterId==1}">上一章</span>
                <span @click.stop="nextChapter" :class="{'disabled':chapterId==titleArr.length}">下一章</span>
              </div>
              <transition name="slide-down">
                <div v-if="pullDown" class="pull-down">{{pullDownText}}</div>
              </transition>
            </div>
          </div>
        </bscroll>
        <transition name="slide-down">
          <v-progress v-show="progressShow && barShow" :chapterArr="titleArr" @rangePro="rangePro" :chapterId="chapterId-1"></v-progress>
        </transition>
        <transition name="slide-down">
          <typeface v-show="typeShow && barShow" @addFont="changeFont(true)" @subFont="changeFont(false)" @rangeFont="rangeFont" :now_color="bg_color"></typeface>
        </transition>
        <transition name="slide-down">
          <bot-nav v-show="barShow" @showCatalog="showCatalog" @toggleFace="toggleFace" @toggleProgress="toggleProgress"></bot-nav>
        </transition>
        <transition name="slide-left">
          <catalog v-show="catalogShow" :catalogShow="catalogShow" :catalogs="titleArr" @changeChapter="changeChapter" :chapterId="chapterId-1"></catalog>
        </transition>
        <transition name="fade">
          <div class="mask" v-if="catalogShow"  @click="catalogShow=false"  @touchmove.stop.prevent></div>
        </transition>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import {mapState,mapMutations} from 'vuex'
  import {getBookTitle,getBookContent} from '../../api/api'
  import VHeader from '../../pubulic/Head.vue'
  import Catalog from './Catalog.vue'
  import BotNav from './BotNav.vue'
  import Typeface from './Typeface.vue'
  import VProgress from './Progress.vue'
  import Bscroll from '../../pubulic/Bscroll.vue'
  export default {
    data() {
      return {
        bookName:"",
        titleArr:[],
        catalogShow:false,
        progressShow:false,
        typeShow:false,
        chapterId:1,
        bookId:0,
        readContent:{},
        barShow:true,
        initSize:14,
        pullDown:false,
        pullUp:false,
        pullDownText:'上拉加载下一章',
        pullUpText:'下拉加载上一章',
        cloak:false,
        threshold:40
      }
    },
    computed:{
      ...mapState([
          'bg_color','isNight','isContinue'
      ])
    },
    methods:{
      ...mapMutations([
          'setBgColor'
      ]),
      scroll(pos,maxY){
          if(pos.y>0){
              this.pullUp=true
          }else{
              this.pullUp=false
          }
          if(pos.y>this.threshold&&!this.cloak){
              this.cloak=true
              this.prevChapter()
              this.pullUp=false
          }

          if(pos.y<maxY+1){
              this.pullDown=true
          }else{
              this.pullDown=false
          }

          if(pos.y<maxY-this.threshold&&!this.cloak){
            this.cloak=true
            this.nextChapter()
            this.pullDown=false
          }
      },
      rangePro(val){
        if(this.timer){
            window.clearTimeout(this.timer)
        }
        this.timer=setTimeout(()=>{
           if(val!=this.chapterId){
             this.chapterId=val
             this._getBookContent()
           }
        },500)
      },
      prevChapter(){
          setTimeout(()=>{
            this.cloak=false
          },500)
          if(this.chapterId==1){
              this.$dialog.center('已经是第一章了')
              return
          }else{
            this.chapterId--
            this._getBookContent()
          }

      },
      nextChapter(){
          setTimeout(()=>{
            this.cloak=false
          },500)
          if(this.chapterId==this.titleArr.length){
              this.$dialog.center('已经是最后一章了')
              return
          }else{
            this.chapterId++
            this._getBookContent()
          }
          this.$refs.scroll.scrollTo(0,0,'0')
      },
      toggleBg(){
          this.barShow=!this.barShow
      },
      changeFont(flag){
          if(flag){
            this.initSize++
          }else{
            this.initSize--
          }
         window.localStorage.setItem('font-size',this.initSize)
      },
      rangeFont(num){
         this.initSize=num
         window.localStorage.setItem('font-size',this.initSize)
      },
      _getBookContent(){
        if(document.querySelector('.reading')){
          document.querySelector('.reading').scrollTop=0
        }
        getBookContent(this.bookId,this.chapterId).then((res)=>{
          if(res){
            this.readContent=res
          }else{
            this.$dialog.center('暂时无法获取数据')
          }
        })
        window.localStorage.setItem(`book_${this.bookId}`,this.chapterId)
      },
      toggleFace(flag){
          this.typeShow=flag
      },
      toggleProgress(flag){
          this.progressShow=flag
      },
      changeChapter(index){
        this.chapterId=index+1
        this._getBookContent()
        this.catalogShow=false
      },
      showCatalog(){
          this.catalogShow=true
      },
      back(){
        this.$router.back()
      }
    },
    components:{
      VHeader,
      Catalog,
      BotNav,
      Typeface,
      VProgress,
      Bscroll
    },
    mounted(){
      this.bookId=this.$router.currentRoute.query.book

      if(window.localStorage.getItem(`book_${this.bookId}`) && this.isContinue){
        this.chapterId=parseInt(window.localStorage.getItem(`book_${this.bookId}`))
      }

      if(window.localStorage.getItem('font-size')){
        this.initSize=window.localStorage.getItem('font-size')
      }

      if(window.localStorage.getItem('bg-color')){
          this.setBgColor(window.localStorage.getItem('bg-color'))
      }

      getBookTitle(this.bookId).then((res)=>{
        this.titleArr=res.titles.split('-')
        this.bookName=res.name
      })
      this._getBookContent()
    }
  }
</script>

<style lang="less" type="text/less">
  .chapter-btn{
    padding: 0.1rem;
    span{
      display: inline-block;
      text-align: center;
      border-radius: 4px;
      border: 1px solid #666;
      width: 40%;
      height: 0.3rem;
      line-height: 0.3rem;
      margin-left: 0.2rem;
    }
    .disabled{
      border: 1px solid #ccc;
    }
  }

  .read-container{
    margin-top: 0.1rem;
    padding: 0 0.1rem;
    p{
      padding: 0.02rem 0;
      text-indent: 0.2rem;
    }
    .pull-down{
      text-align: center;
      color: #666;
      font-size: 0.12rem;
    }
  }
  .hasBar-h3{
    margin-top: 0.5rem;
  }
  .hasBar{
    padding-bottom: 0.68rem;
  }
  .my-head{
    top:0;
    color: #666;
    z-index: 1090;
  }
  .z-bottom{
    z-index: 90;
  }
  .top-nav{
    width: 100%;
    height: 0.5rem;
    background: #000;
    line-height: 0.5rem;
    opacity: .9;
  }
  .reading {
    position: fixed;
    height: 100%;
    width: 100%;
    background: #fff;
    top:0;
    left:0;
    z-index: 100;
    overflow: auto;
    .detail-content{
      width: 95%;
    }
    h3{
      font-size: 0.14rem;
      padding: 0.1rem;
      top:-3px;
      font-weight: normal;
      position: relative;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
      z-index: 100;
      opacity: .98;
      color: #111;
    }
  }
  .bac(@color) {
    background-color: @color;
  }
  .bg-0 {
    .bac(#e9dfc7);
    h3{
      .bac(#e9dfc7);
    }
  }
  .bg-1{
    .bac(#e7eee5);
    h3{
      .bac(#e7eee5);
    }
  }
  .bg-2{
    .bac(#a4a4a4);
    h3{
      .bac(#a4a4a4);
    }
  }
  .bg-3{
    .bac(#cdefcd);
    h3{
      .bac(#cdefcd);
    }
  }
  .bg-4{
    .bac(#283548);
    color: #ccc;
    h3{
      .bac(#283548);
      color: #ccc;
    }
  }
  .bg-5 {
    .bac(#0f1410);
    color: #999;
    h3{
      .bac(#0f1410);
      color: #999;
    }
    .chapter-btn{
      padding: 0.1rem;
      span{
        display: inline-block;
        text-align: center;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 40%;
        height: 0.3rem;
        line-height: 0.3rem;
        margin-left: 0.2rem;
      }
      .disabled{
        border: 1px solid #666;
      }
    }
  }
  .night{
    background: -webkit-linear-gradient(60deg,#737373,#333,#666);
    color: #ccc;
    .chapter-btn{
      padding: 0.1rem;
      span{
        display: inline-block;
        text-align: center;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 40%;
        height: 0.3rem;
        line-height: 0.3rem;
        margin-left: 0.2rem;
      }
      .disabled{
        border: 1px solid #666;
      }
    }
  }
</style>
