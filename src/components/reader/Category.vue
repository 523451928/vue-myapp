<template>
  <transition name="slide">
    <div class="category">
      <div class="category-header">
        <router-link :to="'/'">
          <i></i>
          <h2>{{title}}</h2>
        </router-link>
      </div>
      <bscroll :data="categoryList">
        <div class="category-list" v-if="!loading">
          <ul>
            <li v-for="item in categoryList">
              <router-link :to="{ path: '/reader/bookdetail/',query:{id:item.id}}" @click.native="bookDetailId(item.id)">
                <div class="book-image">
                  <img v-lazy="item.images" alt="">
                </div>
                <div class="book-detail">
                  <h3>{{item.name}}</h3>
                  <p>{{item.intro}}</p>
                  <div class="clearfix info">
                    <div class="author">
                      <i></i>
                      <span>{{item.author}}</span>
                    </div>
                    <div class="category-r">
                      <span></span><span>{{item.serialize}}</span><span>{{item.wordcount}}万字</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </bscroll>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {getBookType} from '../../api/api'
  import {mapState} from 'vuex'
  import Bscroll from "../../pubulic/Bscroll.vue"
  export default {
    data() {
      return {
        categoryList: [],
        loading: true
      }
    },
    created() {
      getBookType(this.$route.params.id).then((res)=>{
        this.categoryList=res
        this.loading = false
      })
    },
    methods: {
      bookDetailId(id) {
//        console.log(id)
      },
      unique(arr) {
        return Array.from(new Set(arr))
      }
    },
    components: {
      Bscroll
    },
    computed: {
      title() {
        var id=this.$route.params.id
        var title=''
        id==1?title='玄幻':id==2?title='修真':id==3?title='都市':id==4?title='历史':id==5?title='网游':'分类'
          return title
      }
    },
  }
</script>

<style lang="less" type="text/less">
  a{
    text-decoration: none;
  }
  .category {
    background-color: #f6f7f9;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .category-header {
    height: 50px;
    background-color: #fff;
    position: relative;
    z-index: 100;
    i {
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

  .category-list {
    margin-top: 15px;
    padding: 15px;
    background-color: #fff;

    ul li {
      display: flex;
      padding-bottom: 10px;
      margin-bottom: 14px;
      border-bottom: 1px solid #ddd;
      a {
        display: flex;
        overflow: hidden;
      }
      .book-image {
        width: 80px;
        background: #f5f5f5;
        img {
          width: 100%;
          box-shadow: 0 1px 3px rgba(0,0,0,.3)
        }
      }
      .book-detail {
        position: relative;
        flex: 1;
        padding: 0;
        overflow: hidden;
        margin-left: 20px;
        h3 {
          font-size: 18px;
          margin-bottom: 10px;
          color: #666;
        }
        .info{
          margin-top: 0.06rem;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          line-clamp: 2;
          font-size: 14px;
          color: #969ba3;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .author {
          float: left;
          color: #969ba3;
          font-size: 13px;
          i {
            position: relative;
            bottom: -3px;
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url("../../assets/images/man.png") no-repeat;
          }
        }
        .category-r {
          float: right;
          color: #969ba3;
          font-size: 10px;
          span {
            border: 1px solid #ccc;
            border-radius: 2px;
            padding: 0 2px;
          }
          span:nth-child(2) {
            color: #ed424b;
          }
          span:nth-child(3) {
            color: #4284ed;
          }
        }
      }
    }
  }
</style>
