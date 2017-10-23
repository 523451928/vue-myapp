<template>
  <transition name="slide" >
      <div class="article-detail" >
        <v-head :msg="titleMsg" @back="back"></v-head>
        <div class="detail-wrapper">
          <div class="author-info">
            <img v-if="detailData.author" :src="detailData.author.avatar_url">
            <i>{{detailData.create_at | lastTime}}</i>
            <em class="top" v-if="detailData.top">置顶</em>
          </div>
          <div class="article-title">
            <h1>{{detailData.title}}</h1>
            <div class="detail-count">
              <div class="visit-count"><i></i><span>{{detailData.visit_count}}</span></div>
              <div class="reply-count"><i></i><span>{{detailData.reply_count}}</span></div>
            </div>
          </div>
          <div v-html="detailData.content"></div>
          <div class="replies-count">
            共<em>({{detailData.reply_count}})</em>条评论
          </div>
          <div class="replies-list">
            <ul>
              <li v-for="(reply,index) in detailData.replies">
                <div class="author-info clearfix">
                  <img v-if="reply.author"  v-lazy="reply.author.avatar_url">
                  <span>{{reply.author.loginname}} <i>{{reply.create_at | lastTime}}</i></span>
                  <div class="content" v-html="reply.content"></div>
                  <div class="ups">
                    <i></i>{{reply.ups.length}}
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
  </transition>
</template>

<script>
  import VHead from '../../pubulic/Head.vue'
  import BScroll from '../../pubulic/Bscroll.vue'
  import {lastTime} from '../../filters/filters'
  import {getCnodeDetail} from '../../api/api'
  import {mapMutations} from 'vuex'
  export default{
    data(){
        return {
          titleMsg:"主题",
          detailData:{}
        }
    },
    components:{
        VHead,
        BScroll
    },
    methods:{
      ...mapMutations(
        ["setMaskShow"]
      ),
      back(){
        this.$router.go(-1)
        setTimeout(()=>{
          this.setMaskShow(false)
        },500)
      }
    },
    mounted(){
//      this.$loading('加载中...')
      getCnodeDetail(this.$router.currentRoute.params.id).then((res)=>{
        this.detailData=res.data
        this.titleMsg=res.data.author.loginname
//        this.$loading.close()
//        setTimeout(()=>{
//          this.$refs.scroll.refresh()
//        },500)
      })
    },
    filters:{
      lastTime
    }
  }
</script>

<style>
  .ups{
    float: right;
    position: relative;
    color: #ff6633;
  }
  .ups i{
    display: inline-block;
    width: 0.18rem;
    height: 0.18rem;
    background: url("../../assets/img/up.png");
    background-size: contain;
    margin-top: 0.1rem;
    position: absolute;
    top:-0.12rem;
    right: 0.14rem;
  }
  .author-info .content{
    margin-left: 0.1rem;
  }
  .replies-count{
    height: 0.34rem;
    line-height: 0.34rem;
    margin-top: 0.2rem;
    text-indent: 0.1rem;
    border-left: 4px solid #ff6633;
  }
  .replies-count em{
    font-style: normal;
    color: #ff6633;
  }
  .detail-count{
    text-align: center;
  }
  .detail-count div{
    display: inline-block;
    position: relative;
  }
  .detail-count div span{
    position: relative;
    top:-0.04rem;
    color: #bcbcbc;
  }
  .visit-count i,.reply-count i{
    width: 20px;
    height: 20px;
    background: url("../../assets/img/read1.png");
    display: inline-block;
    background-size: cover;

  }
  .reply-count i{
    background: url("../../assets/img/reply.png");
    background-size: contain;
  }

  .article-title{
    margin-bottom: 0.14rem;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #ccc;
  }
  .article-title h1{
    font-size: 0.22rem;
    text-align: center;
  }
  .author-info{
    margin-bottom: 0.1rem;
    border-bottom: 1px solid #ccc;
    padding: 0.1rem 0;
    position: relative;
  }
  .author-info span{
    position: absolute;
    left: 0.37rem;
    top:0.1rem;
  }
  .author-info .top{
    font-style: normal;
    position: absolute;
    right: 0;
    top:15px;
    border: 1px solid #FF6633;
    color: #FF6633;
    border-radius: 4px;
    padding: 2px 4px;
  }
  .author-info i{
    font-style: normal;
    color: #777;
  }
  .author-info img{
    width: 0.34rem;
    height: 0.34rem;
    border-radius: 50%;
  }
  .detail-wrapper{
    padding: 0 0.1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.8rem;
  }
  .markdown-text img{
    width: 100%;
  }
  .article-detail{
    position: fixed;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling:touch;
    z-index: 500;
    width: 100%;
    height: 100%;
    background: #fff;
    top:0;
    left: 0;
  }
</style>
