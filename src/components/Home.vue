<template>
  <div class="home">
    <div class="tab-bar">
      <ul>
        <li v-for="(item,index) in tabArr" @click="changeTab(index,item.tab)" :class="{'active':index==activeIndex}">{{item.text}}</li>
      </ul>
    </div>
    <loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @translate-change="translate">
      <ul id="img-load" >
        <li v-for="(item,index) in homeData" @click="toDetail(item)" :class="{'last-li':index==homeData.length-1}">
          <div class="home-item">
            <div class="author-box">
              <!--<img  :imgsrc="item.author.avatar_url"/>-->
              <img  v-lazyload="item.author.avatar_url"/>
              <i>{{item.author.loginname}}</i>
              <span>{{item.create_at | formatTime}} </span>
              <em class="good" v-if="item.good">精华</em>
              <em class="top" v-if="item.top">置顶</em>
            </div>
            <div class="item-title">
              <h2>{{item.title}}</h2>
            </div>
            <div class="item-other">
              <span class="visit-count"><i></i>{{item.visit_count}}</span>
              <span class="reply-count"><i></i>{{item.reply_count}}</span>
              <span class="last_reply">{{item.last_reply_at | lastTime}}</span>
            </div>
          </div>
        </li>
      </ul>
    </loadmore>
    <router-view></router-view>
  </div>
</template>

<script>
  import Loadmore from '../pubulic/loadAndUpdate.vue'
  import {getCnodeTopics} from '../api/api'
  import {lastTime} from '../filters/filters'
  import {mapMutations} from 'vuex'
  import {padLeftZero} from '../assets/js/padLeftZero'
export default {
  name: 'home',
  data () {
    return {
      activeIndex:0,
      allLoaded:false,
      tab:"all",
      pageNum:1,
      homeData:[],
      tabArr:[
        {
          text:"全部",
          tab:""
        },
        {
          text:"精华",
          tab:"good"
        },
        {
          text:"分享",
          tab:"share"
        },
        {
          text:"问答",
          tab:"ask"
        },
        {
          text:"招聘",
          tab:"job"
        }
      ]
    }
  },
  computed:{

  },
  watch:{
    tab(val){
      this.getData()
    },
    $route(to){
      this.setMaskShow(false)
    }
  },
  methods:{
      ...mapMutations([
          "setMaskShow"
      ]),
      translate(num){
          //console.log(num)
      },
      padLeftZero(str){
        return ("00" + str).substr((str + "").length);
      },
      changeTab(index,tab){
        this.activeIndex=index
        this.tab=tab
      },
      toDetail(item){
        this.setMaskShow(true)
        this.$router.push({path:`/home/${item.id}`})
      },
      loadTop(){
        this.getData()
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom(){
        this.pageNum++
        getCnodeTopics(this.tab,this.pageNum).then((res)=>{
          this.homeData=this.homeData.concat(res.data)
          this.$refs.loadmore.onBottomLoaded();
        })
      },
      getData(){
        this.pageNum=1
        this.$loading("加载中...")

        getCnodeTopics(this.tab,this.pageNum).then((res)=>{
          this.$loading.close()
          this.homeData=res.data
//          setTimeout(()=>{
//            this.$lazyload({
//              elm:document.getElementById('img-load').getElementsByTagName('img'),
//              loadImg:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505472217827&di=e24cf99c65ded97fae93d98c55f43020&imgtype=0&src=http%3A%2F%2Fwww.tonghua-china.com%2F3d%2Fimg%2Floading.gif"
//            })
//          },500)
        })
      }
  },
  components:{
    Loadmore
  },
  filters:{
    formatTime(val){
      var date=new Date(val)
      return date.getFullYear()+"-"+padLeftZero(date.getMonth()+1)+"-"
              +padLeftZero(date.getDate())+"  "+padLeftZero(date.getHours())+":"
              +padLeftZero(date.getSeconds())+":"+padLeftZero(date.getMinutes())
    },
    lastTime
  },
  mounted(){
    this.getData()
//    document.querySelector('.mint-loadmore-bottom').style.marginBottom=0

    var data=[{
      "brand": "奔驰",
      "pym": "B",
      "logpic": "images/logimg/2016080511270428.png"
    },{
      "brand": "奥迪",
      "pym": "A",
      "logpic": "images/logimg/2016081002072198.png"
    }, {
      "brand": "宝马",
      "pym": "B",
      "logpic": "images/logimg/2016080502000445.png"
    }, {
      "brand": "保时捷",
      "pym": "B",
      "logpic": "images/logimg/2016081001352069.png"
    }, {
      "brand": "大众",
      "pym": "D",
      "logpic": "images/logimg/2016081206085932.png"
    }];
    var obj={}
    var dataList=[]
    for(var i=0;i<data.length;i++){
        var di=data[i]
        if(!obj[di.pym]){
            dataList.push({
              pym:di.pym,
              list:[di]
            })
          obj[di.pym]=di.pym
        }else{
            for(var j=0;j<dataList.length;j++){
                if(di.pym==dataList[j].pym){
                    dataList[j].list.push(di)
                }
            }
        }
    }
    console.log(dataList.sort(function(a,b){
        return a.pym>b.pym
    }))

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mint-loadmore-bottom{
    margin-bottom: 0 !important;
  }
  image[lazy=loading] {
    width: 30px;
    height: 30px;
    background: #ff6633;
    margin: auto;
  }
  .visit-count i,.reply-count i{
    width: 20px;
    height: 20px;
    background: url("../assets/img/read1.png");
    display: inline-block;
    background-size: cover;
    position: absolute;
    top: 0px;
    left:0.16rem;
  }
  .reply-count i{
    background: url("../assets/img/reply.png");
    background-size: contain;
  }
  .item-other{
    height: 0.2rem;
    line-height: 0.2rem;
    margin-top: 0.1rem;
  }
  .item-other span{
    text-align: center;
    display: inline-block;
    width: 32%;
    border-right: 1px solid #ccc;
    position: relative;
    color: #7b7b7b;
  }
  .item-other .last_reply{
    border: none;
  }
  .item-title{
    padding: 0.05rem 0 0.1rem 0;
    border-bottom: 1px solid #ccc;
  }
  .author-box .good,.author-box .top{
    font-style: normal;
    border: 1px solid #ff6633;
    border-radius: 2px;
    float: right;
    font-size: 0.12rem;
    padding: 1px 4px;
    margin-right: 4px;
    color: #ff6633;
  }
  .author-box .top{
    border: 1px solid red;
    color: red;
  }
  .author-box span{
    font-size: 0.12rem;
    color: #ccc;
  }
  .last-li .home-item{
    margin-bottom: 0;
  }
  .home-item{
    padding: 0.1rem 0.14rem;
    margin-bottom: 0.12rem;
    border-bottom: 1px solid #ccc;
    background: #fff;
  }
  .home{
    background: #f5f5f5;
  }
  .author-box{
    position: relative;
  }
  .author-box img{
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
  .author-box i{
    position: absolute;
    top:0;
    font-style: normal;
    margin-left: 5px;
    color: #666;
  }
  .author-box span{
    margin-left: 5px;
  }
  .tab-bar ul{
    display: flex;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    background: #fff;
    border-bottom: 1px solid #f5f5f5;
  }
  .tab-bar li{
    width: 20%;
    color: #9e9d9d;
  }
  .tab-bar .active{
    color: #666;
    border-bottom: 2px solid #ff6633;
  }
</style>
