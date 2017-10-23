<template>
  <transition name="slide">
    <div class="bookshelf-wrapper">
      <v-head msg="我的书架" @back="back"></v-head>
      <div class="bookshelf">
          <div class="query-wrapper">
            <input class="query-book" type="text" v-model="query" placeholder="请输入书籍名称"/>
          </div>
          <transition-group name="slide-up" tag="ul">
            <li v-for="(item,index) in bookList" :key="item.id">
              <div @click="toBook(item)">
                <img :src="item.imgurl">
                <p>{{item.name}}</p>
                <p class="add-time">{{item.readTime | formatTime}}</p>
                <span class="del-book" @click.stop="removeBook(item,index)">
                  <i>&times;</i>
                </span>
              </div>
            </li>
          </transition-group>
      </div>
      <div class="none-shelf" v-if="bookShelf.length==0">书架空空的哦!</div>
      <div class="none-shelf" v-if="bookShelf.length!=0 && bookList.length==0">书架中没有该书籍!</div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import VHead from '../../pubulic/Head.vue'
  import Bscroll from "../../pubulic/Bscroll.vue"
  import {padLeftZero} from '../../assets/js/padLeftZero'
  export default {
    data() {
      return {
        bookShelf: [],
        query:''
      }
    },
    created() {
      if(window.localStorage.getItem('book_shelf')){
         this.bookShelf=JSON.parse(window.localStorage.getItem('book_shelf'))
      }
    },
    methods: {
      back(){
        this.$router.back()
      },
      formatTime(val){
        var date=new Date(val)
        return date.getFullYear()+"-"+padLeftZero(date.getMonth()+1)+"-"
          +padLeftZero(date.getDate())+"  "+padLeftZero(date.getHours())+":"
          +padLeftZero(date.getSeconds())+":"+padLeftZero(date.getMinutes())
      },
      toBook(item){
        this.$router.push({
          path:"/reader/bookdetail/",
          query:{
            id:item.id
          }
        })
      },
      removeBook(itm,idx){
        this.bookList.splice(idx,1)
        this.bookShelf.forEach((item,index)=>{
            if(item.id==itm.id){
                this.bookShelf.splice(index,1)
            }
        })
        window.localStorage.setItem('book_shelf',JSON.stringify(this.bookShelf))
      }
    },
    computed:{
      bookList(){
        var arr=[]
        this.bookShelf.forEach((item)=>{
          if(item.name.indexOf(this.query)!='-1'|| this.formatTime(item.readTime).indexOf(this.query)!='-1'){
            arr.push(item)
          }
        })
        return arr
      }
    },
    filters:{
      formatTime(val){
        var date=new Date(val)
        return date.getFullYear()+"-"+padLeftZero(date.getMonth()+1)+"-"
          +padLeftZero(date.getDate())+"  "+padLeftZero(date.getHours())+":"
          +padLeftZero(date.getSeconds())+":"+padLeftZero(date.getMinutes())
      }
    },
    components: {
      Bscroll,
      VHead
    }
  }
</script>

<style lang="less" type="text/less">
  .query-wrapper{
    margin-left: 0.28rem ;
    margin-bottom: 0.16rem;
    background-color: #f6f7f9;
    border-radius: 2px;
    width: 3.2rem;
    .query-book{
      outline: none;
      border: 1px solid #fff;
      width: 3.2rem;
      height: 0.3rem;
      border-radius: 2px;
      line-height: 0.3rem;
      text-indent: 0.4rem;
      background: url("../../assets/img/search.png") 0.08rem  center no-repeat;
      background-size: 0.28rem;
    }
    .query-book:focus{
      border: 1px solid #ccc;
    }
  }

  .bookshelf{
    margin-top: 0.6rem;
    ul{
      display: flex;
      li{
        width: 33.3%;
        div{
          padding: 0 0.16rem;
          position: relative;
          img{
            width: 100%;
            max-height: 1.24rem;
            box-shadow: 0 1px 3px rgba(0,0,0,.3)
          }
          p{
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 0.2rem;
            white-space: nowrap;
          }
          .add-time{
            font-size: 12px;
            color: #ccc;
            height: 0.14rem;
            white-space: nowrap;
          }
          .del-book{
            position: absolute;
            top:-14px;
            right: 4px;
            width: 30px;
            height: 30px;
            display: inline-block;
            text-align: center;
            line-height: 30px;
            i{
              display: inline-block;
              width: 16px;
              height: 16px;
              background: #ff4949;
              border-radius: 50%;
              color: #fff;
              text-align: center;
              line-height: 16px;
              box-shadow: 0 1px 4px rgba(255,0,0,.3)
            }
          }
        }
      }
    }
  }
  .bookshelf-wrapper{
    background: #fff;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    .none-shelf{
      text-align: center;
      color: #666;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
