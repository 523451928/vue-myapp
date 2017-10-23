<template>
  <transition name="slide">
    <div class="book-detail">
      <div class="detail-content" v-if="bookDetail">
        <div class="detail-linear">
          <header class="detail-top">
            <a @click="back"><i class="back"></i>
              <h2 class="detail-title">{{bookDetail.name}}</h2>
            </a>
            <router-link to="/reader" class="home-btn"><i class="iconfont icon-shouye"></i></router-link>
          </header>
          <img class="bg-img" :src="bookDetail.images" alt="" >
          <div class="detail-con" v-if="!loading">
            <div class="detail-img">
              <img :src="bookDetail.images" alt=""  onerror="this.src='//y.gtimg.cn/mediastyle/global/img/album_300.png?max_age=31536000';this.onerror=null;" >
            </div>
            <div class="detail-main">
              <h3 class="name">{{bookDetail.name}}</h3>
              <p class="author">作者：{{bookDetail.author}}</p>
              <p class="type">分类：{{bookDetail.type}}</p>
              <p class="word-count">{{bookDetail.wordcount}}万字</p>
              <star :score="bookDetail.ratings" :showScore="true" :size="starSize" :scoreType="false"></star>
            </div>
          </div>
          <div class="read-btn" v-if="!loading">
            <div>
              <button @click="beginRead">
                <router-link :to="{path:'/reader/reading',query:{book:bookDetail.id}}">开始阅读</router-link>
              </button>
            </div>
            <div>
              <button @click="continueRead">
                <router-link :to="{path:'/reader/reading',query:{book:bookDetail.id}}">
                  {{chapterNum>0?'继续阅读':'尚未阅读'}}<span v-if="chapterNum>0"> (第{{chapterNum}}章)</span>
                </router-link>
              </button>
            </div>
            <div>
              <button @click="addBookshelf">
                {{isBookShelf?'已在书架':'加入书架'}}
              </button>
            </div>
          </div>
        </div>
        <div v-if="!loading">
          <div class="detail-intro"  @click="showmore = !showmore">
            <p :class="{show2: !showmore}">
              {{bookDetail.intro}}
            </p>
            <i class="icon-arrow" :class="{rotate:showmore}"></i>
          </div>
          <div class="detail-tag">
            <h3 class="tag">类别标签</h3>
            <ul class="tag-btn clearfix">
              <li>
                {{bookDetail.type}}
              </li>
              <li>
                东方玄幻
              </li>
            </ul>
          </div>
          <div class="detail-like" v-if="likes.length>0">
            <recommend :booklist="likes" :title="title"></recommend>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapState,mapMutations} from 'vuex'
  import {getBookDetail} from '../../api/api'
  import {removeRepeat} from '../../assets/js/removeRepeat'
  import Star from '../../pubulic/Star.vue'
  import Recommend from './Recommend.vue'
  import Book from '../../assets/js/book'
  export default {
    data() {
      return {
        loading: false,
        content: null,
        title:'喜欢本书的人也喜欢',
        bookDetail: {},
        likes: [],  //相似推荐
        showmore: false, //简介显示更多
        starSize:'Small',
        chapterNum:0,
        isRead:false,
        isBookShelf:false
      }
    },
    methods:{
      ...mapMutations([
          'setContinue'
      ]),
      addBookshelf(){
        if(!this.isBookShelf){
          this.isBookShelf=true
          this.setLocal('book_shelf')
          this.$dialog.center('成功加入书架')
        }
      },
      beginRead(){
        this.setLocal('recent_read')
        this.setContinue(false)
      },
      continueRead(){
         this.setLocal('recent_read')
         this.setContinue(true)
      },
      setLocal(name){
          var recentArr=[]
          if(window.localStorage.getItem(name)){
              recentArr=JSON.parse(localStorage.getItem(name))
          }
          recentArr.unshift(new Book({id:this.bookDetail.id,name:this.bookDetail.name,imgurl:this.bookDetail.images}))
          recentArr=removeRepeat(recentArr,'id')
          window.localStorage.setItem(name,JSON.stringify(recentArr))
      },
      back(){
          this.$router.back()
//          this.$router.push({
//            path:'/reader'
//          })
      },
      _getBookDetail(id){
        this.$loading('加载中...')
        if(window.localStorage.getItem(`book_${id}`)){
          this.isRead=true
          this.chapterNum=window.localStorage.getItem(`book_${this.$router.currentRoute.query.id}`)
        }
        this.isBookShelf=false
        if(window.localStorage.getItem("book_shelf")){
          var bookShelf=JSON.parse(window.localStorage.getItem("book_shelf"))
          bookShelf.forEach((item)=>{
            if(item.id==id){
              this.isBookShelf=true
            }
          })
        }
        getBookDetail(id).then((res)=>{
          this.bookDetail=res
          this.likes=[]
          res.like.split('-').forEach((item)=>{
            getBookDetail(item).then((res)=>{
              this.likes.push(res)
            })
          })
          this.$loading.close()
        })
      }
    },
    components:{
      Star,
      Recommend
    },
    mounted(){
        var id=this.$router.currentRoute.query.id
        this._getBookDetail(id)
    },
    watch:{
        $route(val){
          this._getBookDetail(val.query.id)
        }
    }
  }
</script>

<style lang="less" type="text/less">
  .ell {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .book-detail {
    padding: 0 0.1rem;
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
  }

  .loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .detail-linear {
    .bg-img{
      position: absolute;
      /*top: -13.2rem;*/
      z-index: -1;
      left: 0;
      top: calc(50% - 87.5vw);
      width: 100%;
      height: 175vw;
      opacity: .02;
      opacity: calc(.1 + .05);
      -webkit-filter: blur(calc(17px + 1px));
      filter: blur(calc(17px + 1px));
    }
    .detail-top {
      position: fixed;
      display: flex;
      left: 0;
      top: 0;
      right: 0;
      height: 50px;
      background-color: #eee;
      a:first-of-type {
        flex: 1;
      }
      i.back {
        position: absolute;
        left: 10px;
        top: 10px;
        width: 30px;
        height: 30px;
        background: url("../../assets/images/back.png");
      }
      h2 {
        margin: 0 40px;
        font-size: 18px;
        line-height: 50px;
        color: #ed424b;
      }
    }
    .detail-con {
      display: flex;
      margin-top: 50px;
      padding: 15px 0 18px;
      .detail-img {
        width: 100px;
        margin-right: 25px;
        img {
          width: 100%;
        }
      }
      .detail-main {
        flex: 1;
        h3 {
          font-size: 18px;
          line-height: 1.5;
          .ell;
        }
        p {
          font-size: 14px;
          line-height: 1.8;
          .ell;
        }
      }
    }
    .read-btn {
      display: flex;
      > div {
        flex: 1;
        padding-bottom: 20px;
        border-bottom: 1px solid #ddd;
        &:first-child {
          margin-right: 15px;
        }
        button {
          display: block;
          margin: 0 auto;
          width: 100%;
          height: 33px;
          line-height: 33px;
          font-size: 15px;
          vertical-align: middle;
          border: none;
          border-radius: 3px;
          color: #666;
          background-color: #fff;
          border: 1px solid #ddd;
          a{
            width: 100%;
            height: 100%;
            display: inline-block;
            span{
              font-size: 12px;
              color: #888;
            }
          }
        }
        &:first-of-type {
          button {
            background-color: #ed424b;
            a {
              color: #fff;
            }
          }
        }
        &:nth-child(2) {
          margin-right: 15px;
          button {
            color: #333;
            background-color: #fff;
            border: 1px solid #ddd;
          }
        }
      }
    }
  }

  .home-btn {
    padding: 15px 15px 0 0;
    .iconfont {
      font-size: 22px;
      color: #ed424b;
    }
  }

  .detail-intro {
    padding: 20px 0;
    font-size: 16px;
    text-indent: 2em;
    line-height: 1.6;
    border-bottom: 1px solid #ddd;
    position: relative;
    .icon-arrow{
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0.14rem;
      height: 0.14rem;
      transform: rotate(270deg);
      background: url("../../assets/img/back.png");
      background-size: contain;
      transition: all .3s;
    }
    .rotate{
      transform: rotate(90deg);
    }
    p.show2 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      line-clamp: 2;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  .detail-tag {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    h3 {
      font-size: 16px;
      margin-bottom: 10px;
    }
    ul li {
      float: left;
      padding: 3px 10px;
      margin-right: 10px;
      color: #333;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }

  .detail-like {
    h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }
    .like-list {
      display: flex;
      li {
        flex: 1;
      }
    }
  }
</style>
