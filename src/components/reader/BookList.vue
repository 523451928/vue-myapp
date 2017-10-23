<template>
  <div class="book-list">
    <h2 class="title">{{title}}<slot></slot></h2>
    <ul>
      <li v-for="item in datalist">
        <router-link :to="{ path: 'reader/bookdetail/',query:{id:item.id}}" @click.native="bookDetailId(item.id)">
          <div class="book-image">
            <img v-lazy="item.images" alt="" onerror="this.src='//y.gtimg.cn/mediastyle/global/img/album_300.png?max_age=31536000';this.onerror=null;">
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
                <span>{{item.type}}</span><span>{{item.serialize}}</span><span>{{item.wordcount}}万字</span>
              </div>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        typeArr: []
      }
    },
    props: ['datalist', 'title'],
    methods: {
      bookDetailId(id) {
        console.log(id)
      }
    },
    filters: {
      type(value) {
        switch (value) {
          case 1:
            return '玄幻'
            break
          case 2:
            return '修真'
            break
          case 3:
            return '都市'
            break
          case 4:
            return '历史'
            break
          case 5:
            return '网游'
            break
          default:
            return '类型'
        }
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .book-image{
    height: 110px;
  }
  .book-list {
    margin-top: 15px;
    padding: 15px;
    background-color: #fff;
    .title {
      margin-left: 0px;
      margin-bottom: 10px;
      border-left: 2px solid #ed424b;
      text-indent: 5px;
      font-size: 16px;
      line-height: 16px;
    }
    ul li {
      display: flex;
      padding-bottom: 10px;
      margin-bottom: 14px;
      border-bottom: 1px solid #ddd;
      &:last-of-type {
        border-bottom: none;
      }
      a {
        display: flex;
        height: 110px;
      }
      .book-image {
        width: 80px;
        height: 110px;
        img {
          width: 100%;
          box-shadow: 0 1px 3px rgba(0,0,0,.3)
        }
      }
      .book-detail {
        position: relative;
        flex: 1;
        padding: 0;
        margin-left: 20px;
        z-index: 99;
        overflow: hidden;
        h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }
        .info{
          margin-top: 0.08rem;
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
