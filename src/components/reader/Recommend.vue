<template>
  <div class="recommend">
    <h2 class="title">
      {{title}}<slot></slot>
    </h2>
    <div class="list">
      <ul class="list-ul">
        <li class="list-li" v-for="(item,index) in booklist">
          <router-link :to="{ path: '/reader/bookdetail/',query:{id:item.id}}" @click.native="bookDetailId(item.id)">
            <img v-lazy="item.images" alt="" onerror="this.src='//y.gtimg.cn/mediastyle/global/img/album_300.png?max_age=31536000';this.onerror=null;">
            <p class="book-name">{{item.name}}</p>
            <p class="book-author">{{item.author}}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    data() {
      return {}
    },
    props: ['booklist', 'title'],
    methods: {
      bookDetailId(id) {
        //console.log(id)
      }
    }
  }
</script>

<style lang="less" type="text/less">
  .recommend {
    padding:0.1rem 0 0.15rem 0;
    margin-bottom: 0.1rem;
    background-color: #fff;
    .title {
      margin-left: 15px;
      margin-bottom: 10px;
      border-left: 2px solid #ed424b;
      text-indent: 5px;
      font-size: 16px;
      line-height: 16px;
      i{
        font-size: 12px;
        font-weight: normal;
      }
      .day{
        margin-left: 0.1rem;
        background: #ff4949;
      }
      span{
        font-size: 12px;
        font-weight: normal;
        background: #333333;
        color: #fff;
        padding: 0.02rem;
        border-radius: 0.02rem;
      }
    }
    .list {
      .list-ul {
        position: relative;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        overflow-y: hidden;
        white-space: nowrap;
        padding-bottom: 0.08rem;
        text-indent: 7px;
        .list-li {
          display: inline-block;
          margin-right: 8px;
          width: 100px;
          /*white-space: normal;*/
          img {
            width: 100%;
            height:125px;
            box-shadow: 0 1px 3px rgba(0,0,0,.3)
          }
          p {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .book-author{
            font-size: 0.12rem;
            color: #999;
          }
        }
      }
    }
  }
</style>
